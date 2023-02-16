import { useState, useEffect, useCallback } from 'react';
import { projectAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from './useFirestore';
import { Timestamp } from 'firebase/firestore';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const { updateDocument } = useFirestore('users');

  const login = useCallback(
    async (email, password) => {
      setError(null);
      setIsPending(true);
      try {
        const response = await signInWithEmailAndPassword(
          projectAuth,
          email,
          password
        );
        // update login status
        await updateDocument(response.user.uid, {
          online: {
            status: true,
            lastLoggedOut: Timestamp.fromDate(new Date()),
          },
        });

        dispatch({ type: 'LOGIN', payload: response.user });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.log(error.message);
          setIsPending(false);
          setError(error.message);
        }
      }
    },
    [dispatch, isCancelled, updateDocument]
  );

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, login };
};
