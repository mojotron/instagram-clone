import { useState, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// firebase
import { projectFirestore } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const useCollectSavedPosts = () => {
  const { response } = useUserDataContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsPending(true);
    const getDocuments = async () => {
      try {
        const documentsResponse = await Promise.all(
          response.document.savedPosts.map(async id => {
            console.log('1');
            console.log('yo');
            const ref = doc(projectFirestore, 'posts', id);
            const docSnapshot = await getDoc(ref);
            return { ...docSnapshot.data(), id: docSnapshot.id };
          })
        );
        if (isMounted) {
          setIsPending(false);
          setDocuments(documentsResponse);
        }

        console.log(documentsResponse);
      } catch (error) {
        if (isMounted) {
          setIsPending(false);
          setError(error.false);
        }
      }
    };

    getDocuments();

    return () => (isMounted = false);
  }, [response]);

  return { documents, isPending, error };
};
