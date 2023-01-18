import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollectDocsByIdList = (docsIdList, collectionName) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    console.log('hmm', docsIdList);
    const getDocuments = async () => {
      console.log('getting docs');
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

    return () => setIsCancelled(true);
  }, [docsIdList, collectionName, isCancelled]);

  return { documents, isPending, error };
};
