import { useCallback } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, Timestamp, addDoc, doc, getDoc } from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';

export const useMessages = () => {
  // messages between users go to single file, in array, better approach is
  // to create separate file for single message, but i will limit number of
  // between users to 5-10, this is learning project and for that is this
  // approach is fine :)
  const { response, updateDocument } = useUserDataContext();
  const { updateDocument: updateTargetDocument } = useFirestore('users');
  const { updateDocument: updateMessageDocument } = useFirestore('messages');

  const colRef = collection(projectFirestore, 'messages');

  const createMessageObject = useCallback(
    (type, payload) => {
      return {
        type,
        content: payload,
        from: response.document.uid,
        createdAt: Timestamp.fromDate(new Date()),
      };
    },
    [response.document.uid]
  );

  const createMessageDoc = useCallback(
    async (user, type, payload) => {
      try {
        const newDoc = await addDoc(colRef, {
          users: [response.document.uid, user.uid],
          messages: [createMessageObject(type, payload)],
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
      } catch (error) {
        throw error;
      }
    },
    [
      response,
      colRef,
      updateDocument,
      updateTargetDocument,
      createMessageObject,
    ]
  );

  const addMessage = async (messages, user, type, payload, messageDocId) => {
    try {
      if (messages) {
        const updatedMessages = [...messages, createMessageDoc(type, payload)];

        await updateMessageDocument(messageDocId, {
          messages: updatedMessages,
        });
      } else {
        await createMessageDoc(user, type, payload);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMessage = useCallback(
    async (messages, index, messageDocId) => {
      const updatedMessages = messages.filter((_, i) => i !== index);
      try {
        await updateMessageDocument(messageDocId, {
          messages: updatedMessages,
        });
      } catch (error) {
        throw error;
      }
    },
    [updateMessageDocument]
  );

  return {
    addMessage,
    deleteMessage,
  };
};
