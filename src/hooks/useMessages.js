import { useCallback } from 'react'; // TODO REFSCTORING
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

  const haveMessagesCheck = user => {
    return response.document?.messages?.find(obj => obj.messageTo === user.uid);
  };

  const colRef = collection(projectFirestore, 'messages');

  const createMessageDoc = useCallback(
    async (user, type, payload) => {
      try {
        const newDoc = await addDoc(colRef, {
          users: [response.document.uid, user.uid],
          messages: [
            {
              type,
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
      } catch (error) {
        console.log(error);
      }
    },
    [response, colRef, updateDocument, updateTargetDocument]
  );

  const getDocument = async docId => {
    const docRef = doc(projectFirestore, 'messages', docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.empty) throw new Error('Document not found!');
    return { ...docSnapshot.data(), id: docSnapshot.id };
  };

  const addMessage = async (user, type, payload) => {
    const haveMessages = haveMessagesCheck(user);

    try {
      if (haveMessages) {
        const messageDoc = await getDocument(haveMessages.messageDocId);

        await updateMessageDocument(haveMessages.messageDocId, {
          messages: [
            {
              type,
              content: payload,
              from: response.document.uid,
              createdAt: Timestamp.fromDate(new Date()),
            },
            // TODO need old messages
            ...messageDoc.messages,
          ],
        });
      } else {
        await createMessageDoc(user, type, payload);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMessage = async (user, index) => {
    const haveMessages = haveMessagesCheck(user);

    try {
      const messageDoc = await getDocument(haveMessages.messageDocId);

      await updateMessageDocument(haveMessages.messageDocId, {
        messages: messageDoc.messages.filter((msg, i) => i !== index),
      });
      console.log(index);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    addMessage,
    deleteMessage,
  };
};
