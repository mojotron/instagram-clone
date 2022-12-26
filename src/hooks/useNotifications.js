// hooks
import { projectFirestore } from '../firebase/config';
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';
import { collection } from 'firebase/firestore';

export const useNotifications = () => {
  const { updateDocument } = useFirestore('notifications');
  // user notification data
  // - userId
  // - notification array

  // crete notification doc when user creates account

  const addNotification = async (docId, data) => {
    try {
      await updateDocument(docId, data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = async (docId, index) => {};

  // types of notifications
  // like post
  // mention in comment
  // new follower
  // make notification and push it to target user notification array
  // methods
  // - create notification (for first notification user gets)
  // - add notification
  // - delete notification
  // - collect notifications => create new hook
  return { addNotification };
};
