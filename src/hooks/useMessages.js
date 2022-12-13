import { projectFirestore } from '../firebase/config';
import {
  collection,
  query,
  where,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';
import { useEffect, useState } from 'react';
import { useFirestore } from './useFirestore';

export const useMessages = user => {
  const { response, updateDocument } = useUserDataContext();
  const { updateDocument: updateTargetDocument } = useFirestore();

  const userAlreadyHaveMessages = response.document?.messages?.find(
    obj => obj.targetUid === user.uid
  );

  const colRef = collection(projectFirestore, 'messages');

  const createMessageDoc = async text => {
    try {
      const messageObj = {
        users: [response.document.uid, user.uid],
        messages: [text],
      };

      const newDoc = await addDoc(colRef, {
        ...messageObj,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log('1');

      const userObj = { messageTo: user.uid, messageDocId: newDoc.id };
      const targetObj = {
        messageTo: response.document.uid,
        messageDocId: newDoc.id,
      };

      await updateDocument();
    } catch (error) {}
  };

  const addMessage = () => {};

  console.log('already messed ', userAlreadyHaveMessages);
  return { createMessageDoc };
};
