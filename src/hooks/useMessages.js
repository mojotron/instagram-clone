import { useCallback } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, Timestamp, addDoc } from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';
import { MAX_MESSAGES_LIMIT } from '../constants/constants';
import { useNotifications } from './useNotifications';

export const useMessages = () => {
  // messages between users go to single file, in array, better approach is
  // to create separate file for single message, but i will limit number of
  // between users to 5-10, this is learning project and for that is this
  // approach is fine :)
  const { response } = useUserDataContext();
  const { updateDocument } = useFirestore('users');
  const { updateDocument: updateMessageDocument } = useFirestore('messages');

  const { addNotification } = useNotifications();
  // type 'text-message' 'post-message'
  const colRef = collection(projectFirestore, 'messages');

  const _createMessageObject = useCallback(
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

  const _createMessageDoc = useCallback(
    async (userDoc, type, payload) => {
      try {
        const newDoc = await addDoc(colRef, {
          users: [response.document.uid, userDoc.uid],
          messages: [_createMessageObject(type, payload)],
        });
        await updateDocument(response.document.id, {
          messages: [
            ...response.document.messages,
            { messageTo: userDoc.uid, messageDocId: newDoc.id },
          ],
        });
        await updateDocument(userDoc.id, {
          messages: [
            ...userDoc.messages,
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
    [response, colRef, updateDocument, _createMessageObject]
  );

  const addMessage = async (messagesDoc, userDoc, type, payload) => {
    try {
      if (messagesDoc) {
        if (messagesDoc.messages.length >= MAX_MESSAGES_LIMIT) {
          return 'max-limit';
        }
        const updatedMessages = [
          _createMessageObject(type, payload),
          ...messagesDoc.messages,
        ];

        await updateMessageDocument(messagesDoc.id, {
          messages: updatedMessages,
        });
      } else {
        await _createMessageDoc(userDoc, type, payload);
      }
      // TODO add notificatio for new message
      await addNotification(userDoc.uid, null, 'send-message');
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
