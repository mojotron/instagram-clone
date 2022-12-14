import { updateDoc, doc, Timestamp, deleteDoc } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
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

  const followProfile = async (postUid, profileFollowers, profileDocId) => {
    // add target uid to owner following
    const ownAccFollowing = [...response.document.following, postUid];
    // add owner uid to target followers
    const inspectingAccFollowers = [...profileFollowers, response.document.uid];

    await updateDoc(doc(projectFirestore, 'users', profileDocId), {
      followers: inspectingAccFollowers,
    });
    await updateUserDoc(response.document.id, {
      following: ownAccFollowing,
    });
    // add notification to target account
    await addNotification(profileDocId, null, 'follow-user');
  };

  const unfollowProfile = async (postUid, profileFollowers, docId) => {
    // remove target uid from owner following
    const ownAccFollowing = response.document.following.filter(
      item => item !== postUid
    );
    // remove owner uid from target followers
    const inspectingAccFollowers = profileFollowers.filter(
      item => item !== response.document.uid
    );

    await updateDoc(doc(projectFirestore, 'users', docId), {
      followers: inspectingAccFollowers,
    });
    await updateUserDoc(response.document.id, {
      following: ownAccFollowing,
    });
  };

  return {
    toggleLike,
    addComment,
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
    followProfile,
    unfollowProfile,
  };
};
