import { useEffect, useRef } from 'react';
import { useFirestore } from './useFirestore';
import { Timestamp } from 'firebase/firestore';

const ALERT_MSG = `
Maximum number of comments is limited to 5!
This project is for learning purposes!
Thank you for inspecting my project!
`;

export const usePostControl = postId => {
  const { response, getDocumentById, updateDocument } = useFirestore('posts');

  const loadDocument = useRef(() => getDocumentById(postId)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  useEffect(() => {}, [response.document]);

  const addComment = async data => {
    console.log(data);
    const oldComments = response.document.comments;
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

  const toggleLike = async (userLikesPost, userName, userID) => {
    const oldLikes = [...response.document.likes];
    let newLikes;
    if (userLikesPost) {
      newLikes = [...oldLikes, { userName, uid: userID }];
    } else {
      newLikes = oldLikes.filter(like => like.uid !== userID);
    }
    await updateDocument(postId, { likes: newLikes });
  };

  const addReplay = async data => {
    if (response.document.comments.length === 3) {
      alert('Max reply limit');
      return;
    }
    const newComments = [...response.document.comments].map((comment, i) => {
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

  return { response, addComment, toggleLike, addReplay };
};
