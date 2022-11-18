import { useEffect, useRef } from 'react';
import { useFirestore } from './useFirestore';
import { Timestamp } from 'firebase/firestore';
import { useUserDataContext } from './useUserDataContext';

const ALERT_MSG = `
Maximum number of comments is limited to 5,
and maximum number of replies on comment is 3.
This project is for learning purposes!
Thank you for inspecting my project!
`;

export const usePostControl = postId => {
  const { response: userData } = useUserDataContext();
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
    console.log(newComments);
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

  return {
    postResponse,
    addComment,
    toggleLike,
    addReplay,
    deleteComment,
    deleteReply,
  };
};
