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
  getDoc,
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

  const updateDocument = async (docId, data) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(colRef, docId);
      await updateDoc(docRef, data);
      const docSnap = await getDoc(
        doc(projectFirestore, collectionName, docId)
      );

      dispatchIfNotCancelled({
        type: 'UPDATE_DOCUMENT',
        payload: { ...docSnap.data(), id: docSnap.id },
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const checkIfUserExists = async username => {
    // helper function for useSignup hook
    // helper function for checking friend profile in Profile page
    try {
      const q = query(colRef, where('userName', '==', username));
      const querySnapshot = await getDocs(q);
      // negate empty to be more in function name spirit
      if (querySnapshot.empty) return false;
      const users = [];
      querySnapshot.forEach(doc => users.push({ ...doc.data(), id: doc.id }));
      return users[0];
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
