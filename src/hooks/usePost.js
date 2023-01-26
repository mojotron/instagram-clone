import { MAX_POST_COMMENTS_ALERT_MSG } from '../constants/constants';
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';
import { useNotifications } from './useNotifications';
import { Timestamp } from 'firebase/firestore';

export const usePost = () => {
  const { response } = useUserDataContext();
  const { updateDocument: updatePostDoc, deleteDocument } =
    useFirestore('posts');
  const { updateDocument: updateUserDoc } = useFirestore('users');
  const { addNotification } = useNotifications();

  const toggleDisableLikes = async (currentValue, postDocId) => {
    try {
      await updatePostDoc(postDocId, {
        disableLikes: !currentValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDisableComments = async (currentValue, postDocId) => {
    try {
      await updatePostDoc(postDocId, { disableComments: !currentValue });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async postDocId => {
    try {
      await deleteDocument(postDocId);
      const updatePosts = response.document.posts.filter(
        post => post !== postDocId
      );
      await updateUserDoc(response.document.id, { posts: updatePosts });
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (newData, postDocId) => {
    try {
      await updatePostDoc(postDocId, { ...newData });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async (postLikesList, postDocId, userDocId) => {
    try {
      // find out if current user already liked post
      const postIsLiked = postLikesList.find(
        like => like.uid === response.document.uid
      );
      let updatedLikesList;
      if (!postIsLiked) {
        // add new like to post
        updatedLikesList = [
          ...postLikesList,
          { uid: response.document.uid, userName: response.document.userName },
        ];
      } else {
        // filter out current user
        updatedLikesList = postLikesList.filter(
          like => like.uid !== response.document.uid
        );
      }
      await updatePostDoc(postDocId, { likes: updatedLikesList });
      // add notification to post creator
      if (!postIsLiked) {
        await addNotification(
          userDocId,
          postDocId,
          postIsLiked ? 'unlike-post' : 'like-post'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSavePost = async (postSaved, postDocId) => {
    // update current user doc
    try {
      let updatedSavedPosts;
      if (postSaved) {
        updatedSavedPosts = response.document.savedPosts.filter(
          post => post !== postDocId
        );
      } else {
        updatedSavedPosts = [...response.document.savedPosts, postDocId];
      }

      await updateUserDoc(response.document.id, {
        savedPosts: updatedSavedPosts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (text, postComments, postDocId, userDocId) => {
    try {
      if (postComments.length === 5) {
        alert(MAX_POST_COMMENTS_ALERT_MSG);
        return;
      }

      const newComment = {
        text: text,
        userID: response.document.id,
        replies: [],
        createdAt: Timestamp.fromDate(new Date()),
      };

      await updatePostDoc(postDocId, {
        comments: [...postComments, newComment],
      });

      await addNotification(userDocId, postDocId, 'comment-post');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
    toggleLike,
    toggleSavePost,
    addComment,
  };
};
