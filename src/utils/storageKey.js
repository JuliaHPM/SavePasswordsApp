import { useAuth } from '../hooks/auth';

export const storageKey = () => {

    const { user } = useAuth();

    return `@savepasswords:acessos_user:${user.id}`;
}

export const storageKeyListToRemove = `@savepasswords:acessos_listToRemoveOffline`;