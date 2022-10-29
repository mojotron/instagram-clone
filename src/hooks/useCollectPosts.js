import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useCollectPosts = userID => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (!userID) return;
    setIsPending(true);
    let unsubscribe;

    const getDocuments = async () => {
      try {
        const col = collection(projectFirestore, 'posts');
        const q = query(col, where('uid', '==', userID));
        unsubscribe = onSnapshot(q, snapshot => {
          const posts = [];
          snapshot.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(posts);
          setIsPending(false);
          setError(null);
        });
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    getDocuments();
    return () => unsubscribe();
  }, [userID]);

  return { error, isPending, documents };
};
