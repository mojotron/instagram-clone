// icons
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
// style
import './styles/PostControls.css';
// hooks
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useState } from 'react';
import { useMessages } from '../../../hooks/useMessages';
import { useNotifications } from '../../../hooks/useNotifications';
// component
import PostLikedBy from './PostLikedBy';
import NewMessage from '../../Messages/components/NewMessage';

const PostControls = ({ postData, handleCommentReset, handleLikePost }) => {
  // in timeline post handleCommentReset sends user to post page
  const { response, updateDocument } = useUserDataContext();

  const [showLikedBy, setShowLikedBy] = useState(false);
  // is current user liking post
  const userLikesPost = postData.likes.find(
    like => like.userName === response.document.userName
  );
  // find all users from your following list who likes this post
  const followingLike = postData.likes.find(ele =>
    response.document.following.includes(ele.uid)
  );

  const likesCount = postData.likes.length;
  // is current user saved this post
  const userSavedPost = response.document.savedPosts.includes(postData.id);

  const handleSavePostClick = () => {
    let transformed;
    if (userSavedPost) {
      // if user have saved this post filter it out
      transformed = response.document.savedPosts.filter(
        post => post !== postData.id
      );
    } else {
      // or add it to the saved posts
      transformed = [...response.document.savedPosts, postData.id];
    }
    updateDocument(response.document.id, { savedPosts: transformed });
  };

  const { addMessage } = useMessages();
  const [showNewMessage, setShowNewMessage] = useState(false);

  const handleSendPostTo = user => {
    console.log('hello');
    console.log(user.userName);
    addMessage(user, 'post', postData.id);
  };

  const { addNotification } = useNotifications();

  const handleClickLikePost = async userLikesPost => {
    // post data to use in notification hook => user id, post id, content
    try {
      console.log(postData.creator.profileDocId);
      await handleLikePost(postData.likes, postData.id);
      await addNotification(
        postData.creator.profileDocId,
        postData.id,
        userLikesPost ? 'unlike-post' : 'like-post'
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="PostControls">
      {showNewMessage && (
        <NewMessage
          setShowNewMessage={setShowNewMessage}
          setMessageTo={handleSendPostTo}
        />
      )}

      {showLikedBy && (
        <PostLikedBy
          // likes map here to stop infinite rerender
          likes={postData.likes.map(ele => ele.uid)}
          handleClose={() => setShowLikedBy(false)}
        />
      )}

      <div className="PostControls__icons">
        <div className="PostControls__icons__left">
          {!postData.disableLikes && (
            <button
              className="btn btn--post"
              onClick={() => handleClickLikePost(userLikesPost)}
            >
              {userLikesPost ? (
                <AiFillHeart size={25} color="#eb6161" />
              ) : (
                <AiOutlineHeart size={25} />
              )}
            </button>
          )}
          {!postData.disableComments && (
            <button className="btn btn--post" onClick={handleCommentReset}>
              <BiComment size={25} />
            </button>
          )}
          <button
            className="btn btn--post"
            onClick={() => setShowNewMessage(true)}
          >
            <FiSend size={25} />
          </button>
        </div>
        <button className="btn btn--post" onClick={handleSavePostClick}>
          {userSavedPost ? (
            <BsFillBookmarkFill size={25} />
          ) : (
            <BsBookmark size={25} />
          )}
        </button>
      </div>

      {followingLike && (
        <button
          className="btn PostControls__liked-by"
          onClick={() => setShowLikedBy(true)}
        >
          Liked by <span>{followingLike.userName}</span>
          <span>{likesCount > 1 ? ` and ${likesCount - 1} others` : ''}</span>
        </button>
      )}

      {!followingLike && likesCount > 0 && (
        <button
          className="btn PostControls__liked-by"
          onClick={() => setShowLikedBy(true)}
        >
          <span>{likesCount} </span>
          <span>{likesCount > 1 ? 'likes' : 'like'}</span>
        </button>
      )}

      <div className="PostControls__created-at">
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
          .format(new Date(postData.createdAt.seconds * 1000))
          .toUpperCase()}
      </div>
    </section>
  );
};

export default PostControls;
