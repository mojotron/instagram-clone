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
      like => like.uid === postResponse.document.uid
    );
    let newLikes;
    if (!userLikesPost) {
      newLikes = [
        ...postResponse.document.likes,
        { userName: userData.document.userName, uid: userData.document.uid },
      ];
    } else {
      newLikes = postResponse.document.likes.filter(
        like => like.uid !== userData.document.uid
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

  //

  const addComment = async data => {
    const oldComments = postResponse.document.comments;
    if (oldComments.length === 5) {
      alert(ALERT_MSG);
      return;
    }
    const newComments = [
      ...oldComments,
      {
        ...data,
        createdAt: Timestamp.fromDate(new Date()),
      },
    ];
    await updateDocument(postId, { comments: newComments });
  };

  const addReplay = async data => {
    if (
      postResponse.document.comments[data.commentIndex].replies.length === 3
    ) {
      alert(ALERT_MSG);
      return;
    }
    const newComments = postResponse.document.comments.map((comment, i) => {
      if (i === data.commentIndex) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { ...data, createdAt: Timestamp.fromDate(new Date()) },
          ],
        };
      }
      return comment;
    });
    await updateDocument(postId, { comments: newComments });
  };

  const deleteComment = async commentIndex => {
    const newComments = postResponse.document.comments.filter(
      (_, i) => i !== commentIndex
    );

    await updateDocument(postId, { comments: newComments });
  };

  const deleteReply = async (commentIndex, replayIndex) => {
    const newComments = postResponse.document.comments.map((comment, i) => {
      if (i === commentIndex) {
        const newReplies = comment.replies.filter((_, i) => i !== replayIndex);
        return { ...comment, replies: newReplies };
      }
      return comment;
    });
    await updateDocument(postId, { comments: newComments });
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
