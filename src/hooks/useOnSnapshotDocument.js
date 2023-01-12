import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export const useOnSnapshotDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docId) return;
    setIsPending(true);
    let unsubscribe;
    const getDocuments = async () => {
      try {
        let docRef = doc(projectFirestore, collectionName, docId);
        unsubscribe = onSnapshot(docRef, doc => {
          const results = { ...doc.data(), id: doc.id };
          setIsPending(false);
          setError(null);
          setDocument(results);
        });
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    getDocuments();
    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, isPending, error };
};
