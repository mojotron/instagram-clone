import { projectFirestore } from '../firebase/config';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { useState } from 'react';

export const useCollectPostsWithLimit = postLimit => {
  const [lastDocument, setLastDocument] = useState(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  console.log(lastDocument);

  const getNextPosts = async () => {
    if (endOfDocuments) return -1;
    if (isFetching) return -1;

    console.log('called from hook');
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
  };

  return { getNextPosts };
};
