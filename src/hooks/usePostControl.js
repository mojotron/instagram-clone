import { useEffect, useRef } from 'react';
import { useFirestore } from './useFirestore';

export const usePostControl = postId => {
  const { response, getDocumentById } = useFirestore('posts');
  const loadDocument = useRef(() => getDocumentById(postId)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  return { response };
};
