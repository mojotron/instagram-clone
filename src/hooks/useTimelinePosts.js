import { projectFirestore } from '../firebase/config';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  startAt,
} from 'firebase/firestore';
import { useState, useCallback, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// import { TIMELINE_POST_LIMIT } from '../constants/constants';

const TIMELINE_POST_LIMIT = 2;

export const useTimelinePosts = () => {
  const { response } = useUserDataContext();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const [lastDocument, setLastDocument] = useState(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);

  const getFirstPosts = useCallback(async () => {
    console.log('set first');
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

      const data = await getDocs(q);

      if (data.empty) {
        setEndOfDocuments(true);
        setPosts([]);
        return;
      }

      const result = [];
      let last;

      data.docs.forEach(doc => {
        result.push(doc.id);
        last = doc;
      });

      setLastDocument(last);
      setIsFetching(false);
      if (!isCancelled) {
        setPosts(result);
      }
    } catch (error) {}
  }, [isCancelled, response.document.following, response.document.id]);

  const getNextPosts = useCallback(async () => {
    if (endOfDocuments) return;
    if (isFetching) return;

    console.log('lastDoc', lastDocument);
    try {
      setIsFetching(true);

      const q = query(
        collection(projectFirestore, 'posts'),
        where('uid', 'in', [
          ...response.document.following,
          response.document.id,
        ]),
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument),
        limit(TIMELINE_POST_LIMIT)
      );

      const data = await getDocs(q);

      if (data.empty) {
        setEndOfDocuments(true);
        return;
      }

      const result = [];
      let last;

      data.docs.forEach(doc => {
        result.push(doc.id);
        last = doc;
      });

      console.log('moredocs', result);

      setLastDocument(last);
      setIsFetching(false);

      if (!isCancelled) {
        setPosts(oldValue => [...oldValue, ...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [
    isFetching,
    lastDocument,
    endOfDocuments,
    response.document.following,
    response.document.id,
    isCancelled,
  ]);

  useEffect(() => {
    getFirstPosts();
    // get first posts if user add new document or delete one
  }, [getFirstPosts, response.document.posts]);

  useEffect(() => {
    return () => setIsCancelled(false);
  }, []);

  return { posts, getNextPosts };
};
