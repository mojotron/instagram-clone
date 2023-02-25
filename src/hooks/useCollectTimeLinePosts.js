import { useState, useCallback, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// firebase
import { projectFirestore } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from 'firebase/firestore';
// constant
import { TIMELINE_POST_LIMIT } from '../constants/constants';

export const useCollectTimeLinePosts = () => {
  const { response } = useUserDataContext();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

  console.log(lastVisible);

  const firstDocuments = useCallback(async () => {
    console.log('first call');
    setIsPending(true);
    setDocuments(null);
    setLastVisible(null);
    try {
      const q = query(
        collection(projectFirestore, 'posts'),
        where('uid', 'in', [
          ...response.document.following,
          response.document.id,
        ]),
        orderBy('createdAt', 'desc'),
        limit(TIMELINE_POST_LIMIT)
      );
      const documentSnapshots = await getDocs(q);
      const documents = documentSnapshots.docs.map(ele => ({
        ...ele.data(),
        id: ele.id,
      }));
      if (!isCancelled) {
        setIsPending(false);
        setDocuments(documents);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError('Network error, please try later!');
      }
    }
  }, [response.document.following, response.document.id, isCancelled]);

  const nextDocuments = useCallback(async () => {
    setIsPending(true);
    try {
      const q = query(
        collection(projectFirestore, 'posts'),
        where('uid', 'in', [
          ...response.document.following,
          response.document.id,
        ]),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(TIMELINE_POST_LIMIT)
      );
      const documentSnapshots = await getDocs(q);
      // TODO check for empty
      const documents = documentSnapshots.docs.map(ele => ({
        ...ele.data(),
        id: ele.id,
      }));
      if (!isCancelled) {
        setIsPending(false);
        setDocuments(oldValue => [...oldValue, ...documents]);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError('Network error, please try later!');
      }
    }
  }, [
    response.document.following,
    response.document.id,
    isCancelled,
    lastVisible,
  ]);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  // OLD way => for legacy
  // useEffect(() => {
  //   setIsPending(true);
  //   let unsubscribe;

  //   const getDocuments = async () => {
  //     try {
  //       const col = collection(projectFirestore, 'posts');
  //       const q = query(
  //         col,
  //         where('uid', 'in', [
  //           ...response.document.following,
  //           response.document.uid,
  //         ])
  //       );
  //       unsubscribe = onSnapshot(q, snapshot => {
  //         const posts = [];
  //         snapshot.forEach(doc => {
  //           posts.push({ ...doc.data(), id: doc.id });
  //         });
  //         setDocuments(
  //           posts.sort((a, b) => a.createdAt.seconds < b.createdAt.seconds)
  //         );
  //         setIsPending(false);
  //         setError(null);
  //       });
  //     } catch (error) {
  //       setIsPending(false);
  //       setError(error.message);
  //     }
  //   };

  //   getDocuments();
  //   return () => unsubscribe();
  // }, [response]);

  return { documents, isPending, error, nextDocuments, firstDocuments };
};
