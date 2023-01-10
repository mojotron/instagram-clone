import { useState, useEffect } from 'react';
// firebase auth
import { projectAuth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from './useFirestore';
import { useSearchUsers } from './useSearchUsers';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // auth context
  const { dispatch } = useAuthContext();
  // firestore
  const { createDocWithCustomID, documentExist, getDocumentById } =
    useFirestore('users');
  const { addToBucket } = useSearchUsers();

  const signup = async (email, password, data) => {
    setError(null);
    setIsPending(true);
    try {
      // check if userName exist in publicUsernames collections **
      const usernameExist = await documentExist(
        'public_usernames',
        data.userName
      );
      if (usernameExist) {
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
      await createDocWithCustomID(response.user.uid, 'users', {
        ...data,
        uid: response.user.uid,
      });
      // create public_usernames collection doc with custom id which is username so
      // in account creation we can check if user exists **
      await createDocWithCustomID(data.userName, 'public_usernames', {
        userName: data.userName,
      });
      // create notification doc
      await createDocWithCustomID(response.user.uid, 'notifications', {
        notifications: [],
      });
      // add user to search_user bucket
      await addToBucket(data.userName, response.user.uid);
      // get created user for auth dispatch
      const createdUser = await getDocumentById(response.user.uid);
      // change login context and display user dashboard after all documents are created
      dispatch({ type: 'LOGIN', payload: createdUser });
      // change DOM state only if is component mounted
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
