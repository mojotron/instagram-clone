import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
// import firestore hook do create rational database auth -> users
import { useFirestore } from './useFirestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const { addDocument, checkIfUserExists } = useFirestore('users');
  const { addDocument: addNotificationDoc } = useFirestore('notifications');

  const signup = async (email, password, data) => {
    // create auth user =>
    // await
    // create user doc
    // create avatar doc
    // create notification doc
    setError(null);
    setIsPending(true);
    try {
      // TODO implement different logic, this one throw error, we cannot read
      // this data until we are logged in - at this point we are not
      // check if username is already used
      // PLAN: every time user is created username will be a document in
      // public_usernames collection which will be public for reading
      // so before creating new user this method will check if reference
      // to the document exists
      //
      // const publicUsernameRef = doc(
      //   projectFirestore,
      //   'public_usernames',
      //   data.username
      // );

      // console.log('usernameExists, ', publicUsernameRef);

      // const usernameExist = await checkIfUserExists(data.userName);
      // if (usernameExist !== false)
      //   throw new Error('Username already exist, please try another one!');

      const response = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      if (!response) throw new Error('Could not create user account!');
      // create user document using useFirestore hook
      console.log('user created', response.user);
      await addDocument({ ...data, uid: response.user.uid });
      // TODO create public_usernames doc
      await setDoc(doc(projectFirestore, 'public_usernames', data.username), {
        username: data.username,
      });
      // TODO create notification doc
      await addNotificationDoc({ uid: response.user.uid, notifications: [] });
      dispatch({ type: 'LOGIN', payload: response.user });
      //
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
