import { useState, useEffect, useReducer } from 'react';
import { projectFirestore } from '../firebase/config';
import {
  addDoc,
  collection,
  where,
  Timestamp,
  query,
  getDocs,
  doc,
  updateDoc,
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
    case 'GET_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'UPDATE_DOCUMENT':
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

  const getDocument = async uid => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const q = query(colRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) throw new Error('User not found!');
      let userDocument;
      querySnapshot.forEach(doc => {
        userDocument = { ...doc.data(), id: doc.id };
        return;
      });
      dispatchIfNotCancelled({ type: 'GET_DOCUMENT', payload: userDocument });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const updateDocument = async (uid, data) => {
    console.log(data);
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(colRef, uid);
      await updateDoc(docRef, data);

      dispatchIfNotCancelled({ type: 'UPDATE_DOCUMENT', payload: null });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const checkIfUserExists = async username => {
    // helper function for useSignup hook
    try {
      const q = query(colRef, where('userName', '==', username));
      const querySnapshot = await getDocs(q);
      // negate empty to be more in function name spirit
      return !querySnapshot.empty;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    response,
    addDocument,
    getDocument,
    updateDocument,
    checkIfUserExists,
  };
};
