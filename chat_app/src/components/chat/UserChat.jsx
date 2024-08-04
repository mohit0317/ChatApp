import React, { useContext } from 'react'
import useFetchRecipientUser from '../../hooks/useFetchRecipientUser'
import { Stack } from 'react-bootstrap';
import Avatar from '../../assets/Avatar.svg'
import { baseurl, getRequest } from '../../utils/services';
import { ChatContext } from '../../context/chatContext';
import useAvatarInitials from '../../hooks/useAvatarInitials';

function UserChat({ chat, user }) {

    const recipientUser = useFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext);
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)
    const initials = useAvatarInitials(recipientUser?.name)

    const avatarStyle = {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2em'
    };

    return (
        <Stack role='button' direction='horizontal'
            gap={3}
            className='user-card
            align-items-center
            p-2
            justify-content-between '
        >
            <div className="d-flex">
                <div className='me-3'>
                    {recipientUser?.name ? (
                        <div className="avatar-circle" style={avatarStyle}>
                            {initials}
                        </div>
                    ) : (
                        <img src={Avatar} alt="IMG" height={35} />
                    )}
                </div>
                <div className="text-content">
                    <div className='name'>
                        {recipientUser?.name}
                    </div>
                    <div className="text">Text Message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end ">
                <div className="date">12/12/2024</div>
                <div className="this-user-notifications">2</div>
                <span className={isOnline ? "user-online" : ''}></span>
            </div>
        </Stack>
    )
}

export default UserChat
