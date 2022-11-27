import { useState, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// firebase
import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useCollectTimeLinePosts = () => {
  const { response } = useUserDataContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    setIsPending(true);
    let unsubscribe;

    const getDocuments = async () => {
      try {
        const col = collection(projectFirestore, 'posts');
        const q = query(
          col,
          where('uid', 'in', [
            ...response.document.following,
            response.document.uid,
          ])
        );
        unsubscribe = onSnapshot(q, snapshot => {
          const posts = [];
          snapshot.forEach(doc => {
            posts.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(
            posts.sort((a, b) => a.createdAt.seconds < b.createdAt.seconds)
          );
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
  }, [response]);

  return { documents, isPending, error };
};
