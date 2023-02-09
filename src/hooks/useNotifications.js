import { useCallback } from 'react';
import { useFirestore } from './useFirestore';
import { useUserDataContext } from './useUserDataContext';
import { Timestamp } from 'firebase/firestore';
import { useSearchUsers } from './useSearchUsers';

export const useNotifications = () => {
  // notification document is created when user creates account
  // - document has 2 properties user id (UID) and array with notifications
  // - form of notification => type, createdAt - timeStamp, from - userDocID
  // read notification with diff hook useCollectNotifications
  const { response } = useUserDataContext();
  const { getDocumentById, updateDocument, documentExist } =
    useFirestore('notifications');
  const { getUsersIDs } = useSearchUsers();

  const getType = type => {
    switch (type) {
      case 'like-post':
        return 'liked your post.';
      case 'follow-user':
        return 'started following you.';
      case 'comment-post':
        return 'commented: ';
      case 'replied on comment':
        return 'replied to your comment: ';
      case 'mention-user':
        return 'mentioned you in comment: ';
      default:
        return 'unknown action';
    }
  };

  const addNotification = useCallback(
    async (userID, postDocId, type, payload = '') => {
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

        // TODO update user doc for new notification
      } catch (error) {
        console.log(error);
      }
    },
    [getDocumentById, response, updateDocument]
  );

  const checkForUserNames = text =>
    [...text.matchAll(/@[a-z]+/gi)].map(ele => ele[0].slice(1));

  const mentionUserNotification = useCallback(
    async (userID, postDocId, text) => {
      const usernames = checkForUserNames(text);
      if (usernames.length === 0) return;

      try {
        // check if username exist
        const checkUsernames = await Promise.all(
          usernames.map(username => {
            return documentExist('public_usernames', username);
          })
        );
        // get existing users docs
        const existingUsers = usernames.filter((_, i) => checkUsernames[i]);
        const userIds = await getUsersIDs(existingUsers);
        console.log(userIds);
        // send notification to all user except user which gets comment/replay notification
        for (const user of userIds) {
          if (user === userID) continue;
          addNotification(user, postDocId, 'mention-user', text);
        }
      } catch (error) {
        throw error;
      }
    },
    [addNotification, getUsersIDs, documentExist]
  );

  return { addNotification, mentionUserNotification };
};
