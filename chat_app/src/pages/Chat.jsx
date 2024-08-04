import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext';
import { Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from './../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

function Chat() {

  const { user } = useContext(AuthContext);
  const { userChats,
    isUserChatsLoading,
     updateCurretnChat } = useContext(ChatContext);


  return (
    <>
      <PotentialChats />
      {
        userChats?.length < 1 ? null :
          (
            <Stack direction='horizontal' gap={5} className='align-items-start' >
              <Stack className='flex-grow-0 message-box pe-3 ' gap={3} >
                {isUserChatsLoading && <p>Loading chats...</p>}
                {userChats?.map((chat, index) => {
                  return (
                    <div onClick={() => { updateCurretnChat(chat) }} key={index}>
                      <UserChat chat={chat} user={user} />
                    </div>
                  )
                })
                }
              </Stack>
              <ChatBox/>
            </Stack>
          )
      }




    </>
  )
}

export default Chat