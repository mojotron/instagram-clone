import { useState, useEffect, useReducer } from 'react';
import { projectFirestore } from '../firebase/config';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';

const initialState = {
  document: null,
  isPending: null,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, isPending: false, error: null, success: false };
    case 'ADD_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'ERROR':
      return {
        document: null,
        isPending: null,
        error: action.payload,
        success: null,
      };
    default:
      return state;
  }
};

export const useFirestore = collectionName => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const colRef = collection(projectFirestore, collectionName);

  const dispatchIfNotCancelled = action => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async data => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(colRef, { ...data, createdAt });
      dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addedDocument });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const checkIfUserExists = async username => {
    // helper function in useSignup
    try {
      const querySnapshot = await getDocs(colRef);
      let userExist = false;
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.userName === username) userExist = true;
      });
      return userExist;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, checkIfUserExists };
};
