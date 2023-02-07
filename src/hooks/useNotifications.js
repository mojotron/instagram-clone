import { useFirestore } from './useFirestore';
import { useUserDataContext } from './useUserDataContext';
import { Timestamp } from 'firebase/firestore';

export const useNotifications = () => {
  // notification document is created when user creates account
  // - document has 2 properties user id (UID) and array with notifications
  // - form of notification => type, createdAt - timeStamp, from - userDocID
  // read notification with diff hook useCollectNotifications
  const { response } = useUserDataContext();
  const { getDocumentById, updateDocument } = useFirestore('notifications');

  const getType = type => {
    switch (type) {
      case 'like-post':
        return 'liked your post.';
      case 'follow-user':
        return 'started following you.';
      case 'comment-post':
        return 'commented:';
      case 'replied on comment':
        return 'replied to your comment';
      case 'mention-user':
        return 'mentioned you in comment:';
      default:
        return 'unknown action';
    }
  };

  const addNotification = async (userID, postDocId, type, payload = '') => {
    try {
      const userNotifications = await getDocumentById(userID);

      const notificationObject = {
        createdAt: Timestamp.fromDate(new Date()),
        fromUserId: response.document.id,
        post: postDocId,
        content: getType(type),
        payload,
      };

      await updateDocument(userID, {
        notifications: [
          ...userNotifications.notifications,
          notificationObject,
        ].slice(-20), // keep limit on notification object at last 20
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { addNotification };
};
