import { useState, useCallback, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// firebase
import { projectFirestore } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from 'firebase/firestore';
// constant
// import { TIMELINE_POST_LIMIT } from '../constants/constants';

const TIMELINE_POST_LIMIT = 1;

export const useCollectTimeLinePosts = () => {
  const { response } = useUserDataContext();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [listeners, setListeners] = useState([]);
  const [documents, setDocuments] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [nextCalled, setNextCalled] = useState(false);

  console.log(lastVisible, nextCalled);

  const firstDocuments = useCallback(async () => {
    console.log('getting first docs');
    setIsPending(true);
    setDocuments(null);
    setLastVisible(null);
    setNextCalled(false);
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
      const listener = onSnapshot(q, documentSnapshots => {
        const documents = documentSnapshots.docs.map(ele => ({
          ...ele.data(),
          id: ele.id,
        }));

        setListeners(oldValue => [...oldValue, listener]);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );

        if (!isCancelled) {
          setIsPending(false);
          setDocuments(documents);
        }
      });
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError('Network error, please try later!');
      }
    }
  }, [response.document.following, response.document.id, isCancelled]);

  const nextDocuments = useCallback(async () => {
    console.log('next');
    setIsPending(true);
    setNextCalled(true);
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
      const listener = onSnapshot(q, documentSnapshots => {
        if (documentSnapshots.docs.length === 0) {
          setIsPending(false);
          return;
        }
        const documents = documentSnapshots.docs.map(ele => ({
          ...ele.data(),
          id: ele.id,
        }));

        setListeners(oldValue => [...oldValue, listener]);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );
        setNextCalled(false);

        if (!isCancelled) {
          setIsPending(false);
          setDocuments(oldValue => [...oldValue, ...documents]);
        }
      });
    } catch (error) {
      setNextCalled(false);
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
    return () => {
      setIsCancelled(true);
      setNextCalled(false);
    };
  }, []);

  useEffect(() => {
    return () => listeners.forEach(listener => listener());
  }, [listeners]);

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

  return {
    documents,
    isPending,
    error,
    nextDocuments,
    firstDocuments,
    nextCalled,
  };
};
