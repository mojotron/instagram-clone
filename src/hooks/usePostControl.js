import { useEffect, useRef } from 'react';
import { useFirestore } from './useFirestore';
import { projectFirestore } from '../firebase/config';
import { Timestamp, updateDoc, doc } from 'firebase/firestore';

const ALERT_MSG = `
Maximum number of comments is limited to 5,
and maximum number of replies on comment is 3.
This project is for learning purposes!
Thank you for inspecting my project!
`;

export const usePostControl = (postId, userData, updateUserDoc) => {
  // updateUserDoc if for update userProfileDoc
  // postResponse -> updateDocument i s for updating postDoc
  // updateDoc is for updating targetProfileDoc
  const {
    response: postResponse,
    getDocumentById,
    updateDocument,
    deleteDocument,
  } = useFirestore('posts');

  const loadDocument = useRef(() => getDocumentById(postId)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  useEffect(() => {}, [postResponse.document]);

  const toggleLike = async (postLikes, userId) => {
    const userLikesPost = postResponse.document.likes.find(
      like => like.uid === userData.uid
    );
    console.log(userLikesPost);
    let newLikes;
    if (!userLikesPost) {
      newLikes = [
        ...postResponse.document.likes,
        { userName: userData.userName, uid: userData.uid },
      ];
    } else {
      newLikes = postResponse.document.likes.filter(
        like => like.uid !== userData.uid
      );
    }
    await updateDocument(postResponse.document.id, { likes: newLikes });
  };

  const toggleDisableLikes = async (currentValue, docId) => {
    await updateDocument(postResponse.document.id, {
      disableLikes: !postResponse.document.disableLikes,
    });
  };

  const toggleDisableComments = async (currentValue, docId) => {
    await updateDocument(postResponse.document.id, {
      disableComments: !postResponse.document.disableComments,
    });
  };

  const deletePost = async docId => {
    await deleteDocument(postResponse.document.id);
  };

  const editPost = async (newData, docId) => {
    await updateDocument(postResponse.document.id, {
      ...newData,
    });
  };

  const followProfile = async (postUid, profileFollowers, profileDocId) => {
    console.log('calleds');
    // add target uid to owner following
    const ownAccFollowing = [...userData.following, postUid];
    // add owner uid to target followers
    const inspectingAccFollowers = [...profileFollowers, userData.uid];

    await updateDoc(doc(projectFirestore, 'users', profileDocId), {
      followers: inspectingAccFollowers,
    });
    await updateUserDoc(userData.id, {
      following: ownAccFollowing,
    });
  };

  const unfollowProfile = async (postUid, profileFollowers, profileDocId) => {
    // remove target uid from owner following
    const ownAccFollowing = userData.following.filter(item => item !== postUid);
    // remove owner uid from target followers
    const inspectingAccFollowers = profileFollowers.filter(
      item => item !== userData.uid
    );

    await updateDoc(doc(projectFirestore, 'users', profileDocId), {
      followers: inspectingAccFollowers,
    });
    await updateUserDoc(userData.id, {
      following: ownAccFollowing,
    });
  };

  // TODO
  const addComment = async (text, postComments, docId) => {
    if (postComments.length === 5) {
      alert(ALERT_MSG);
      return;
    }

    const newComment = {
      text: text,
      userName: userData.userName,
      avatarUrl: userData.avatar.url,
      replies: [],
      createdAt: Timestamp.fromDate(new Date()),
    };

    await updateDocument(postResponse.document.id, {
      comments: [...postResponse.document.comments, newComment],
    });
  };

  const deleteComment = async commentIndex => {
    const newComments = postResponse.document.comments.filter(
      (_, i) => i !== commentIndex
    );

    await updateDocument(postResponse.document.id, { comments: newComments });
  };

  const addReplay = async (text, commentIndex) => {
    if (postResponse.document.comments[commentIndex].replies.length === 3) {
      alert(ALERT_MSG);
      return;
    }
    const newComments = postResponse.document.comments.map((comment, i) => {
      if (i === commentIndex) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              text,
              userName: userData.userName,
              avatarUrl: userData.avatar.url,
              createdAt: Timestamp.fromDate(new Date()),
            },
          ],
        };
      }
      return comment;
    });
    await updateDocument(postResponse.document.id, { comments: newComments });
  };

  const deleteReply = async (commentIndex, replayIndex) => {
    const newComments = postResponse.document.comments.map((comment, i) => {
      if (i === commentIndex) {
        const newReplies = comment.replies.filter((_, i) => i !== replayIndex);
        return { ...comment, replies: newReplies };
      }
      return comment;
    });
    await updateDocument(postResponse.document.id, { comments: newComments });
  };

  return {
    postResponse,
    toggleLike,
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
    followProfile,
    unfollowProfile,
    //
    addComment,
    addReplay,
    deleteComment,
    deleteReply,
  };
};
