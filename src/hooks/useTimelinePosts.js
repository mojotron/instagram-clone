import { projectFirestore } from '../firebase/config';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useState, useCallback, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
import { TIMELINE_POST_LIMIT } from '../constants/constants';

export const useTimelinePosts = () => {
  const { response } = useUserDataContext();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const [lastDocument, setLastDocument] = useState(null);
  const [endOfDocuments, setEndOfDocuments] = useState(false);

  const getFirstPosts = useCallback(async () => {
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
      setEndOfDocuments(false);
      if (!isCancelled) {
        setPosts(result);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setIsFetching(false);
      }
    }
  }, [isCancelled, response.document.following, response.document.id]);

  const getNextPosts = useCallback(async () => {
    if (endOfDocuments) return;
    if (isFetching) return;

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
        setIsFetching(false); // last added
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
        setPosts(oldValue => [...oldValue, ...result]);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setIsFetching(false);
      }
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

  return { posts, error, isFetching, getNextPosts };
};
