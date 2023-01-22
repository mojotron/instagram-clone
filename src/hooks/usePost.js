import { MAX_POST_COMMENTS_ALERT_MSG } from '../constants/constants';
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';

export const usePost = () => {
  const { response } = useUserDataContext();
  const { updateDocument: updatePostDoc, deleteDocument } =
    useFirestore('posts');
  const { updateDocument: updateUserDoc } = useFirestore('users');

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

  return {
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
  };
};
