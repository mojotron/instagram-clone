import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
// import firestore hook do create rational database auth -> users
import { useFirestore } from './useFirestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const { addDocument: addUsersDoc } = useFirestore('users');
  const { addDocument: addNotificationDoc } = useFirestore('notifications');

  const signup = async (email, password, data) => {
    setError(null);
    setIsPending(true);
    try {
      // check if userName exist in publicUsernames collections **
      const usernameDocRef = await getDoc(
        doc(projectFirestore, `public_usernames/${data.userName}`)
      );
      console.log('check for username', usernameDocRef);
      if (usernameDocRef.exists()) {
        throw new Error('Username already exist, please try another one!');
      }
      // create new account in firebase auth
      const response = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      if (!response) throw new Error('Could not create user account!');
      // create users collection user doc using useFirestore hook
      await addUsersDoc({ ...data, uid: response.user.uid });
      // create public_usernames collection doc with custom id which is username so
      // in account creation we can check if user exists **
      await setDoc(doc(projectFirestore, 'public_usernames', data.userName), {
        userName: data.userName,
        createdAt: Timestamp.fromDate(new Date()),
      });
      // create notification doc
      await addNotificationDoc({ uid: response.user.uid, notifications: [] });
      // change login context and display user dashboard after all documents are created
      dispatch({ type: 'LOGIN', payload: response.user });
      //
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error);
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
