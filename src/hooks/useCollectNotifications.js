import { projectFirestore } from '../firebase/config';
import { onSnapshot, doc } from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';
import { useEffect, useState } from 'react';

export const useCollectNotifications = () => {
  const { response } = useUserDataContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (!response) return;
    console.log('useCollectNoti useEffect');

    let unsubscribe;
    const fetchDocument = async () => {
      setIsPending(true);
      try {
        unsubscribe = onSnapshot(
          doc(
            projectFirestore,
            'notifications',
            response.document.notificationDocId
          ),
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
  }, [response]);

  return {
    document,
    isPending,
    error,
  };
};
