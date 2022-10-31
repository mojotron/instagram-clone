import { projectFirestore } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useCollectUsers = userIDList => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (userIDList.length < 1) return;
    setIsPending(true);

    const getDocuments = async () => {
      try {
        const q = query(
          collection(projectFirestore, 'users'),
          where('uid', 'in', [...userIDList])
        );
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach(doc => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(users);
        setIsPending(false);
        setError(null);
      } catch (error) {
        console.log(error);
        setIsPending(false);
        setError(error.message);
      }
    };

    getDocuments();
    // return () => unsubscribe();
  }, [userIDList]);

  return { error, isPending, documents };
};
