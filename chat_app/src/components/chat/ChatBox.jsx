import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/AuthContext';
import useFetchRecipientUser from '../../hooks/useFetchRecipientUser';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from "react-input-emoji";

const ChatBox = () => {

    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading,sendtextMessage } = useContext(ChatContext);
    const recipientUser = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

    console.log('textMessage', textMessage);

    if (!recipientUser) {
        return (
            <p style={{ textAlign: 'center', width: '100%' }} >  No conversation selected yet... 🧐 </p>
        )
    }
    if (isMessagesLoading) {
        return (
            <p style={{ textAlign: 'center', width: '100%' }} >  Loading Chats... 🤞 </p>
        )
    }

    console.log('recipientUser', recipientUser);
    console.log('currentChat', currentChat);
    console.log('messages', messages);

    return (
        <>
            <Stack gap={4} className='chat-box'>
                <div className="chat-header">
                    <strong> {recipientUser?.name}</strong>
                </div>
                <Stack gap={3} style={{ flexGrow: '0' }} className="messages">
                    {messages && messages.map((msg, index) => {
                        const isSender = msg.senderId === user.id;
                        return (
                            <Stack
                                key={index}
                                className={`message ${isSender ? 'sender' : 'recipient'}`}
                                direction="horizontal"
                                style={{
                                    justifyContent: isSender ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div>
                                    <span style={{ color: isSender ? 'black' : 'Brown' }}>
                                        {msg?.text}
                                    </span>
                                    <br />
                                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                                        {moment(msg?.createdAt).format('MMMM Do YYYY, h:mm a')}
                                    </span>
                                </div>
                            </Stack>
                        );
                    })}
                </Stack>
                <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0'>
                    <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily='nunito' borderColor='yellow' />
                    <button className='send-btn' onClick={()=>{sendtextMessage(textMessage,user?.id,currentChat?._id,setTextMessage)}}  >
                        {textMessage ? <i class="bi bi-send-fill"></i> : <i class="bi bi-send"></i>}
                    </button>
                </Stack>
            </Stack>
        </>
    )
}

export default ChatBox
