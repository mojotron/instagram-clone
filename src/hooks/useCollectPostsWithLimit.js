import { projectFirestore } from '../firebase/config';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { useState, useCallback } from 'react';

export const useCollectPostsWithLimit = postLimit => {
  const [lastDocument, setLastDocument] = useState(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getNextPosts = useCallback(async () => {
    if (endOfDocuments) return -1;
    if (isFetching) return -1;

    try {
      setIsFetching(true);
      const colRef = collection(projectFirestore, 'posts');
      const q = query(
        colRef,
        orderBy('createdAt', 'asc'),
        startAfter(lastDocument || 0),
        limit(postLimit)
      );
      const data = await getDocs(q);

      if (data.empty) {
        setEndOfDocuments(true);
        return -1;
      }

      const result = [];
      let last;
      data.docs.forEach(doc => {
        result.push({ ...doc.data(), id: doc.id });
        last = doc;
      });
      setLastDocument(last);
      setIsFetching(false);

      return result;
    } catch (error) {
      console.log(error.message);
    }
  }, [isFetching, lastDocument, endOfDocuments, postLimit]);

  return { getNextPosts };
};
