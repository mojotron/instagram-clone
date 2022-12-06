import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useSearchUsers = () => {
  const ref = collection(projectFirestore, 'users');
  // TODO create in firebase list of all user for better preformance and refactor
  const [isCanceled, setIsCanceled] = useState(false);
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const searchForUsers = async searchTerm => {
    setIsPending(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(ref);
      const result = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.userName.startsWith(searchTerm)) {
          console.log(data.userName.startsWith(searchTerm));
          result.push({ ...data, id: doc.id });
        }
      });
      if (!isCanceled) {
        setIsPending(false);
        setDocuments(result);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCanceled) {
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  const reset = () => {
    setDocuments(null);
    setIsPending(false);
    setError(null);
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { documents, isPending, error, searchForUsers, reset };
};
