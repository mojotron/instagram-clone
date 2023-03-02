import { useState, useCallback, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
import { projectFirestore } from '../firebase/config';
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  orderBy,
  startAfter,
} from 'firebase/firestore';

const TIMELINE_POST_LIMIT = 2;

export const useCollectTimeLinePosts = () => {
  const { response } = useUserDataContext();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [listeners, setListeners] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [nextCalled, setNextCalled] = useState(false);

  console.log('listeners', listeners);

  const firstDocuments = useCallback(async () => {
    console.log('getting first docs');
    setListeners([]);
    setDocuments([]);
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
      let obj;

      const listener = onSnapshot(q, documentSnapshots => {
        const docs = {
          added: [],
          modified: [],
          removed: [],
        };
        documentSnapshots.docChanges().forEach(change => {
          const current = { ...change.doc.data(), id: change.doc.id };
          if (change.type === 'added') {
            docs.added.push(current);
          }
          if (change.type === 'modified') {
            console.log('modified');
            docs.modified.push(current);
          }
          if (change.type === 'removed') {
            docs.removed.push(current);
          }
        });
        obj = docs;

        console.log(obj);
        if (!isCancelled) {
          setIsPending(false);
          setDocuments(oldValue => {
            if (!oldValue) return [...obj.added];
            console.log('oldValue is', oldValue);
            let updated = [...oldValue];
            obj.modified.forEach(ele => {
              updated = updated.map(doc => (doc.id === ele.id ? ele : doc));
            });
            obj.removed.forEach(ele => {
              updated = updated.filter(doc => doc.id !== ele.id);
            });

            return [...updated, ...obj.added];
          });

          if (obj.added.length > 0) {
            setListeners(oldValue => [...oldValue, listener]);
          }

          setLastVisible(
            documentSnapshots.docs[documentSnapshots.docs.length - 1]
          );
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
      let obj;
      const listener = onSnapshot(q, documentSnapshots => {
        if (documentSnapshots.docs.length < 1) return;
        const docs = {
          added: [],
          modified: [],
          removed: [],
        };
        documentSnapshots.docChanges().forEach(change => {
          const current = { ...change.doc.data(), id: change.doc.id };
          if (change.type === 'added') {
            docs.added.push(current);
          }
          if (change.type === 'modified') {
            console.log('modified');
            docs.modified.push(current);
          }
          if (change.type === 'removed') {
            docs.removed.push(current);
          }
        });
        obj = docs;

        console.log(obj);
        if (!isCancelled) {
          setIsPending(false);
          setDocuments(oldValue => {
            if (!oldValue) return [...obj.added];
            console.log('oldValue is', oldValue);
            let updated = [...oldValue];
            obj.modified.forEach(ele => {
              updated = updated.map(doc => (doc.id === ele.id ? ele : doc));
            });
            obj.removed.forEach(ele => {
              updated = updated.filter(doc => doc.id !== ele.id);
            });

            return [...updated, ...obj.added];
          });

          if (obj.added.length > 0) {
            setListeners(oldValue => [...oldValue, listener]);
          }

          setLastVisible(
            documentSnapshots.docs[documentSnapshots.docs.length - 1]
          );
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
      console.log('unmount');
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
