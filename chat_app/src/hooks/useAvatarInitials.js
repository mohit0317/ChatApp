// src/hooks/useAvatarInitials.js
import { useMemo } from 'react';

const useAvatarInitials = (name) => {
    return useMemo(() => {
        if (!name) return '';
        const nameParts = name.split(' ');
        const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
        return initials;
    }, [name]);
};

export default useAvatarInitials;
