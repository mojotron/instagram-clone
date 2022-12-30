import { useFirestore } from './useFirestore';
import { useUserDataContext } from './useUserDataContext';
import { Timestamp } from 'firebase/firestore';

export const useNotifications = () => {
  // notification document is created when user creates account
  // - document has 2 properties user id (UID) and array with notifications
  // - form of notification => type, createdAt - timeStamp, from - userDocID
  // read notification with diff hook useCollectNotifications
  const { response } = useUserDataContext();
  const { getDocumentById } = useFirestore('users');
  const { updateDocument, getDocumentById: getNotificationsDoc } =
    useFirestore('notifications');

  const getType = type => {
    switch (type) {
      case 'like-post':
        return 'liked your post.';
      case 'unlike-post':
        return 'unliked your post.';
      case 'follow-user':
        return 'started following you.';
      case 'comment-post':
        return 'commented:';
      case 'mention-user':
        return 'mentioned you in comment:';
      default:
        return 'unknown action';
    }
  };

  const addNotification = async (userDocId, postDocId, type, payload = '') => {
    // console.log(userDocId, postDocId, type);

    try {
      const userDoc = await getDocumentById(userDocId);
      const userNotifications = await getNotificationsDoc(
        userDoc.notificationDocId
      );

      const notificationObject = {
        createdAt: Timestamp.fromDate(new Date()),
        fromUserId: response.document.id,
        post: postDocId,
        content: getType(type),
      };

      await updateDocument(userDoc.notificationDocId, {
        notifications: [...userNotifications.notifications, notificationObject],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { addNotification };
};
