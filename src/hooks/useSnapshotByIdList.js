import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useSnapshotByIdList = (idList, collectionName, limit) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    setIsPending(true);
    let unsubscribe;

    const getDocuments = async () => {
      try {
        const col = collection(projectFirestore, 'posts');
        const q = query(col, where('docId', 'in', [idList]));
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
  }, [idList]);

  return { error, isPending, documents };
};
