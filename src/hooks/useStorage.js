import { useReducer, useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
// unique id
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  isPending: false,
  error: null,
  success: false,
  imageUrl: null,
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
        imageUrl: null,
      };
    case 'UPLOAD_IMAGE':
      return {
        isPending: false,
        error: null,
        success: true,
        imageUrl: action.payload,
      };
    case 'DELETE_IMAGE':
      return {
        isPending: false,
        error: null,
        success: true,
        imageUrl: null,
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
      const fileName = `${directory}/${uuidv4()}-${file.name}`;
      const storageRef = ref(projectStorage, fileName);
      await uploadBytes(storageRef, file);
      const snapUrl = await getDownloadURL(storageRef);
      dispatchIfNotCancelled({ type: 'UPLOAD_IMAGE', payload: snapUrl });
      return { url: snapUrl, fileName: fileName };
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const remove = async fileName => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const storageRef = ref(projectStorage, `${fileName}`);
      await deleteObject(storageRef);
      dispatchIfNotCancelled({ type: 'DELETE_IMAGE' });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, upload, remove };
};
