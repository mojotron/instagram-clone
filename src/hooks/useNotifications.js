import { useFirestore } from './useFirestore';

export const useNotifications = () => {
  // notification document is created when user creates account
  // - document has 2 properties user id (UID) and array with notifications
  // - form of notification => type ???, createdAt - timeStamp, from - userDocID
  // read notification with diff hook useCollectNotifications
  const { updateDocument } = useFirestore('notifications');

  const updateNotifications = async (docId, notificationArray) => {
    try {
      await updateDocument(docId, notificationArray);
    } catch (error) {
      console.log(error);
    }
  };

  return { updateNotifications };
};
