import { projectFirestore } from '../firebase/config';
import { onSnapshot, doc } from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';
import { useEffect, useState } from 'react';

export const useCollectMessage = user => {
  // messages between users go to single file, in array, better approach is
  // to create separate file for single message, but i will limit number of
  // between users to 5-10, this is learning project and for that is this
  // approach is fine :)
  const { response } = useUserDataContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [document, setDocument] = useState(null);

  const haveMessages = response.document?.messages?.find(
    obj => obj.messageTo === user.uid
  );

  useEffect(() => {
    if (!haveMessages) return;

    let unsubscribe;
    const fetchDocument = async () => {
      setIsPending(true);
      try {
        unsubscribe = onSnapshot(
          doc(projectFirestore, 'messages', haveMessages.messageDocId),
          doc => {
            setIsPending(false);
            setDocument({ ...doc.data(), id: doc.id });
          }
        );
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchDocument();

    return () => unsubscribe();
  }, [haveMessages]);

  return {
    document,
    isPending,
    error,
  };
};
