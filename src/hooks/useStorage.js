import { useReducer, useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';
import {} from 'firebase/storage';

const initialState = {
  isPending: false,
  error: null,
  success: null,
  imageUrls: null,
};

const storageReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const useStorage = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(storageReducer, initialState);

  const dispatchIfNotCancelled = action => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const upload = async (directory, file) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, upload };
};
