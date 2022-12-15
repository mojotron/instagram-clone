import { projectFirestore } from '../firebase/config';
import {
  collection,
  Timestamp,
  addDoc,
  onSnapshot,
  doc,
} from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';
import { useEffect, useState } from 'react';
import { useFirestore } from './useFirestore';

export const useMessages = user => {
  // messages between users go to single file, in array, better approach is
  // to create separate file for single message, but i will limit number of
  // between users to 5-10, this is learning project and for that is this
  // approach is fine :)
  const { response, updateDocument } = useUserDataContext();
  const { updateDocument: updateTargetDocument } = useFirestore('users');
  const { updateDocument: updateMessageDocument } = useFirestore('messages');

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [document, setDocument] = useState(null);

  const haveMessages = response.document?.messages?.find(
    obj => obj.messageTo === user.uid
  );

  const colRef = collection(projectFirestore, 'messages');

  useEffect(() => {
    if (!haveMessages) return;

    let unsubscribe;
    const fetchDocument = async () => {
      setIsPending(true);
      try {
        unsubscribe = onSnapshot(
          doc(projectFirestore, 'messages', haveMessages.messageDocId),
          doc => {
            setIsPending(false);
            setDocument({ ...doc.data(), id: doc.id });
          }
        );
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchDocument();

    return () => unsubscribe();
  }, [haveMessages]);

  const createMessageDoc = async (type, payload) => {
    const messageType = type === 'text' ? 'text' : 'post';
    try {
      const newDoc = await addDoc(colRef, {
        users: [response.document.uid, user.uid],
        messages: [
          {
            type: messageType,
            content: payload,
            from: response.document.uid,
            createdAt: Timestamp.fromDate(new Date()),
          },
        ],
      });
      await updateDocument(response.document.id, {
        messages: [
          ...response.document.messages,
          { messageTo: user.uid, messageDocId: newDoc.id },
        ],
      });
      await updateTargetDocument(user.id, {
        messages: [
          ...user.messages,
          {
            messageTo: response.document.uid,
            messageDocId: newDoc.id,
          },
        ],
      });
    } catch (error) {}
  };

  const addMessage = async (type, payload) => {
    const messageType = type === 'text' ? 'text' : 'post';
    try {
      if (haveMessages) {
        console.log(document.messages);
        await updateMessageDocument(haveMessages.messageDocId, {
          messages: [
            {
              type: messageType,
              content: payload,
              from: response.document.uid,
              createdAt: Timestamp.fromDate(new Date()),
            },
            ...document.messages,
          ],
        });
      } else {
        await createMessageDoc(type, payload);
      }
    } catch (error) {
      console.log('error');
    }
  };

  const deleteMessage = async () => {};

  return {
    haveMessages,
    document,
    isPending,
    error,
    createMessageDoc,
    addMessage,
  };
};
