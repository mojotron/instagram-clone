import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
// import firestore hook do create rational database auth -> users
import { useFirestore } from './useFirestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const { addDocument, checkIfUserExists } = useFirestore('users');

  const signup = async (email, password, data) => {
    setError(null);
    setIsPending(true);
    try {
      // check if username is already used
      const usernameExist = await checkIfUserExists(data.userName);
      if (usernameExist)
        throw new Error('Username already exist, please try another one!');

      const response = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      if (!response) throw new Error('Could not create user account!');
      // create user document using useFirestore hook
      await addDocument({ ...data, uid: response.user.uid });
      //
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
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, signup };
};
