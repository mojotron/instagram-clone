import { updateDoc, doc, Timestamp, deleteDoc } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useFirestore } from './useFirestore';
import { useNotifications } from './useNotifications';
import { useUserDataContext } from './useUserDataContext';

const ALERT_MSG = `
Maximum number of comments is limited to 5,
and maximum number of replies on comment is 3.
This project is for learning purposes!
Thank you for inspecting my project!
`;

export const useTimeLinePostHandlers = () => {
  const { response, updateDocument: updateUserDoc } = useUserDataContext();
  const { updateDocument: updatePostDoc } = useFirestore('posts');

  const { addNotification } = useNotifications();

  const toggleLike = async (postLikes, docId) => {
    // save likes with username and uid, for easier display of friends that liked post
    // uid is for filtering following list and usernames are for displaying who followed
    const userLikesPost = postLikes.find(
      like => like.uid === response.document.uid
    );
    let newLikes;
    if (!userLikesPost) {
      newLikes = [
        ...postLikes,
        { userName: response.document.userName, uid: response.document.uid },
      ];
    } else {
      newLikes = postLikes.filter(like => like.uid !== response.document.uid);
    }
    await updateDoc(doc(projectFirestore, 'posts', docId), { likes: newLikes });
    // add notification
  };

  const addComment = async (text, postComments, docId) => {
    if (postComments.length === 5) {
      alert(ALERT_MSG);
      return;
    }

    const newComment = {
      text: text,
      userName: response.document.userName,
      avatarUrl: response.document.avatar.url,
      replies: [],
      createdAt: Timestamp.fromDate(new Date()),
    };

    await updateDoc(doc(projectFirestore, 'posts', docId), {
      comments: [...postComments, newComment],
    });
    // add notification for post and user mention
  };

  const toggleDisableLikes = async (currentValue, docId) => {
    await updateDoc(doc(projectFirestore, 'posts', docId), {
      disableLikes: !currentValue,
    });
  };

  const toggleDisableComments = async (currentValue, docId) => {
    await updateDoc(doc(projectFirestore, 'posts', docId), {
      disableComments: !currentValue,
    });
  };

  const deletePost = async docId => {
    await deleteDoc(doc(projectFirestore, 'posts', docId));
  };

  const editPost = async (newData, docId) => {
    await updateDoc(doc(projectFirestore, 'posts', docId), {
      ...newData,
    });
  };

  return {
    toggleLike,
    addComment,
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
  };
};
