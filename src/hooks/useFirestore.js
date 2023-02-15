import { useState, useEffect, useReducer, useCallback } from 'react';
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
  setDoc,
  deleteDoc,
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
    case 'DELETE_DOCUMENT':
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export const useFirestore = collectionName => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const colRef = collection(projectFirestore, collectionName);

  const dispatchIfNotCancelled = useCallback(
    action => {
      if (!isCancelled) {
        dispatch(action);
      }
    },
    [isCancelled]
  );

  const addDocument = useCallback(
    async data => {
      dispatch({ type: 'IS_PENDING' });
      try {
        const createdAt = Timestamp.fromDate(new Date());
        const addedDocument = await addDoc(colRef, { ...data, createdAt });
        dispatchIfNotCancelled({
          type: 'ADD_DOCUMENT',
          payload: addedDocument,
        });
        return addedDocument;
        // this is doc ref => to get collection/docId => save this method to the
        // variable and on that variable call id method (const docRef = await addDocument() => docRef.id)
      } catch (error) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
    },
    [colRef, dispatchIfNotCancelled]
  );

  const getDocument = useCallback(
    async uid => {
      dispatch({ type: 'IS_PENDING' });
      try {
        const q = query(colRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) throw new Error('Document not found!');
        let userDocument;
        querySnapshot.forEach(doc => {
          userDocument = { ...doc.data(), id: doc.id };
          return;
        });
        dispatchIfNotCancelled({ type: 'GET_DOCUMENT', payload: userDocument });
      } catch (error) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
    },
    [colRef, dispatchIfNotCancelled]
  );

  const getDocumentById = useCallback(
    async docId => {
      dispatch({ type: 'IS_PENDING' });
      try {
        const docRef = doc(projectFirestore, collectionName, docId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.empty) throw new Error('Document not found!');
        const userDocument = { ...docSnapshot.data(), id: docSnapshot.id };
        dispatchIfNotCancelled({ type: 'GET_DOCUMENT', payload: userDocument });
        return userDocument;
      } catch (error) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
    },
    [collectionName, dispatchIfNotCancelled]
  );

  const getDocumentByIdAndCollectionName = useCallback(
    async (collectionName, docId) => {
      dispatch({ type: 'IS_PENDING' });
      try {
        const docRef = doc(projectFirestore, collectionName, docId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.empty) throw new Error('Document not found!');
        const userDocument = { ...docSnapshot.data(), id: docSnapshot.id };
        dispatchIfNotCancelled({ type: 'GET_DOCUMENT', payload: userDocument });
        return userDocument;
      } catch (error) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
    },
    [dispatchIfNotCancelled]
  );

  const updateDocument = useCallback(
    async (docId, data) => {
      console.log('test', data);
      const docRef = doc(projectFirestore, collectionName, docId);
      dispatch({ type: 'IS_PENDING' });
      try {
        console.log('1');
        console.log('test', data);
        await updateDoc(docRef, data);
        const docSnap = await getDoc(docRef);

        dispatchIfNotCancelled({
          type: 'UPDATE_DOCUMENT',
          payload: { ...docSnap.data(), id: docSnap.id },
        });
      } catch (error) {
        console.log('err');
        dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
    },
    [collectionName, dispatchIfNotCancelled]
  );

  const deleteDocument = useCallback(
    async docId => {
      dispatch({ type: 'IS_PENDING' });
      try {
        await deleteDoc(doc(projectFirestore, collectionName, docId));
        dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' });
      } catch (error) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      }
    },
    [dispatchIfNotCancelled, collectionName]
  );

  const createDocWithCustomID = useCallback(
    async (customID, collectionName, data) => {
      // helper function used without reducer, used in useSignup hook for creating
      // user documents with user id as doc id
      try {
        await setDoc(doc(projectFirestore, collectionName, customID), {
          ...data,
          createdAt: Timestamp.fromDate(new Date()),
        });
      } catch (error) {
        throw error;
      }
    },
    []
  );

  // helper function
  const documentExist = useCallback(async (collectionName, docId) => {
    try {
      const usernameDocRef = await getDoc(
        doc(projectFirestore, `${collectionName}/${docId}`)
      );
      return usernameDocRef.exists();
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    response,
    addDocument,
    getDocument,
    getDocumentById,
    updateDocument,
    deleteDocument,
    createDocWithCustomID,
    documentExist,
    getDocumentByIdAndCollectionName,
  };
};
