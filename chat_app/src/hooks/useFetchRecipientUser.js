import React, { useEffect, useState } from 'react'
import { baseurl, getRequest } from '../utils/services';

function useFetchRecipientUser(chat, user) {
   
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.members?.find((id) => id !== user?.id)
  
    useEffect(() => {
        const getUser = async () => {

            if (!recipientId) return null;

            const response = await getRequest(`${baseurl}/users/find/${recipientId}`)
            if (response.error) {
                return setError(error);
            }

            setRecipientUser(response);
        }
        getUser();
    }, [recipientId])

    return recipientUser;
}

export default useFetchRecipientUser