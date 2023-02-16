import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollectDocsByIdList = (docsIdList, collectionName) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (!Array.isArray(docsIdList)) return;
    let isCancelled = false;
    const getDocuments = async () => {
      try {
        const documentsResponse = await Promise.all(
          docsIdList.map(async id => {
            const docRef = doc(projectFirestore, collectionName, id);
            const docSnapshot = await getDoc(docRef);
            return { ...docSnapshot.data(), id: docSnapshot.id };
          })
        );
        if (!isCancelled) {
          setIsPending(false);
          setDocuments(documentsResponse);
        }
      } catch (error) {
        console.error(error);
        if (!isCancelled) {
          setIsPending(false);
          setError('Could not fetch data!');
        }
      }
    };

    getDocuments();

    return () => (isCancelled = true);
  }, [docsIdList, collectionName]);

  return { documents, isPending, error };
};
