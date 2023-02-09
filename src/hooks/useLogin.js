import { useState, useEffect, useCallback } from 'react';
import { projectAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

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
    [dispatch, isCancelled]
  );

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, login };
};
