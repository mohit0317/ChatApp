import React, { useContext } from 'react'
import { ChatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    console.log('potentialChats', potentialChats);

    return (
        <div className='all-users'>
            {
                potentialChats &&
                potentialChats?.map((u, index) => {
                    return (
                        <div className="single-user" key={index} onClick={() => { createChat(user?.id, u?._id) }} >
                            {u?.name}
                            <span className={onlineUsers?.some((user) => user?.userId === u?._id) ? "user-online" : ""}></span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PotentialChats
