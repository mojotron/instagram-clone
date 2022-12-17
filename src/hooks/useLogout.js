import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from './useFirestore';
import { useUserDataContext } from './useUserDataContext';
import { Timestamp } from 'firebase/firestore';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const { updateDocument } = useFirestore('users');
  const { response } = useUserDataContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      console.log('logging out', response.document.id);
      await updateDocument(response.document.id, {
        online: {
          status: false,
          lastLoggedOut: Timestamp.fromDate(new Date()),
        },
      });
      await signOut(projectAuth);

      dispatch({ type: 'LOGOUT' });
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, logout };
};
