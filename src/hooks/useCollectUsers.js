import { projectFirestore } from '../firebase/config';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useCollectUsers = userIDList => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (userIDList.length < 1) return;
    let unsubscribe;
    setIsPending(true);

    console.log('hook', userIDList);
    const getDocuments = async () => {
      try {
        const q = query(
          collection(projectFirestore, 'users'),
          where('uid', 'in', [...userIDList])
        );
        unsubscribe = await onSnapshot(q, snapshot => {
          const users = [];
          snapshot.forEach(doc => {
            users.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(users);
          setIsPending(false);
          setError(null);
        });
      } catch (error) {
        console.log(error);
        setIsPending(false);
        setError(error.message);
      }
    };

    getDocuments();

    return () => unsubscribe();
  }, [userIDList]);

  return { error, isPending, documents };
};
