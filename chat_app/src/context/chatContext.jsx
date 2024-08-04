import { createContext, useEffect, useState } from 'react';
import { getRequest, baseurl, postRequest } from '../utils/services';
import { io } from "socket.io-client";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setuserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState();
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(null);
    const [messagesError, setMessageserror] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState();
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log('onlineUsers', onlineUsers);


    //initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    }, [user])


    // add online users
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });
    }, [socket])

    
    //send message
    useEffect(() => {
        if (socket === null) return;
        const recipientId = currentChat?.members?.find((id) => id !== user?.id)
        socket.emit('sendMessage', { ...newMessage, recipientId });
    }, [newMessage])


    //receive message
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", res => {
            if (currentChat?._id !== res?.chatId) return;
            setMessages((prev) => [...prev, res]);
        });
        return () => {
            socket.off("getMesage")
        }
    }, [socket, currentChat])


    useEffect(() => {
        const getUserChats = async () => {
            if (user?.id) {
                setIsUserChatsLoading(true);
                setuserChatsError(null);
                const response = await getRequest(`${baseurl}/chats/${user.id}`);
                setIsUserChatsLoading(false);

                if (response.error) {
                    return setuserChatsError(response);
                }
                setUserChats(response);
            }
        }
        getUserChats();
    }, [user])

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseurl}/users`);

            if (response.error) {
                return console.log('Error while fetching users', response);
            }
            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (u?._id === user?._id) {
                    return false;
                }
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat?.members?.includes(u?._id);
                    })
                }
                return !isChatCreated;
            })
            setPotentialChats(pChats);
        }
        getUsers();
    }, [userChats])

    useEffect(() => {
        const getMessages = async () => {

            setIsMessagesLoading(true);
            setMessageserror(null);

            const response = await getRequest(`${baseurl}/messages/${currentChat?._id}`);
            setIsMessagesLoading(false);

            if (response.error) {
                return setMessageserror(response);
            }

            setMessages(response);
        }
        getMessages();
    }, [currentChat])

    const createChat = async (firstId, secondId) => {
        console.log('firstId, secondId', firstId, secondId);
        const response = await postRequest(`${baseurl}/chats`, {
            firstId: firstId,
            secondId: secondId
        });
        if (response.error) {
            return console.log('Error creating chat'.response);
        }
        setUserChats((prev) => [...prev, response])
    }

    const updateCurretnChat = (chat) => {
        setCurrentChat(chat);
    }

    const sendtextMessage = async (textMessage, sender, currentChatId, setTextMessage) => {

        if (!textMessage) return console.log("You must have text...");

        const response = await postRequest(`${baseurl}/messages/`, {
            chatId: currentChatId,
            senderId: sender,
            text: textMessage
        });
        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage('');
    }

    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurretnChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendtextMessage,
        onlineUsers
    }
    } >
        {children}
    </ChatContext.Provider>

}
