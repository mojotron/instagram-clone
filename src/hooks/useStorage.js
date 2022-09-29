import { useReducer, useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const initialState = {
  isPending: false,
  error: null,
  success: false,
  imageUrls: null,
};

const storageReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, error: null, success: false, imageUrls: null };
    case 'ERROR':
      return {
        isPending: false,
        error: action.payload,
        success: false,
        imageUrls: null,
      };
    case 'UPLOAD_IMAGE':
      return {
        isPending: false,
        error: null,
        success: true,
        imageUrls: action.payload,
      };
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

  const upload = async (directory, file) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const storageRef = ref(projectStorage, `${directory}/${file.name}`);
      await uploadBytes(storageRef, file);
      const snapUrl = await getDownloadURL(storageRef);
      dispatchIfNotCancelled({ type: 'UPLOAD_IMAGE', payload: snapUrl });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, upload };
};
