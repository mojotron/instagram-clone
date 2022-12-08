// icons
import heartIcon from '../../../images/heart-icon.svg';
import heartLikedIcon from '../../../images/heart-red-icon.svg';
import commentIcon from '../../../images/comment-outline-icon.svg';
import sendIcon from '../../../images/send-icon.svg';
import bookmarkIcon from '../../../images/bookmark-icon.svg';
import bookmarkFilledIcon from '../../../images/bookmark-icon-filled.svg';
// style
import './styles/PostControls.css';
// hooks
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useState } from 'react';
import PostLikedBy from './PostLikedBy';
// component

const PostControls = ({
  postData,
  handleCommentReset,
  handleLikePost,
  handleFollow,
  handleUnfollow,
}) => {
  // in timlinepost handleCommentReset sends user to post page
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

  return (
    <section className="PostControls">
      {showLikedBy && (
        <PostLikedBy
          // likes map here to stop infinite rerender
          likes={postData.likes.map(ele => ele.uid)}
          handleClose={() => setShowLikedBy(false)}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      )}

      <div className="PostControls__icons">
        <div className="PostControls__icons__left">
          {!postData.disableLikes && (
            <button
              className="btn btn--post"
              onClick={async () => {
                await handleLikePost(postData.likes, postData.id);
              }}
            >
              <img
                src={userLikesPost ? heartLikedIcon : heartIcon}
                alt="like"
              />
            </button>
          )}
          {!postData.disableComments && (
            <button className="btn btn--post" onClick={handleCommentReset}>
              <img src={commentIcon} alt="comment" />
            </button>
          )}
          <button className="btn btn--post">
            <img src={sendIcon} alt="send" />
          </button>
        </div>
        <button className="btn btn--post" onClick={handleSavePostClick}>
          <img
            src={userSavedPost ? bookmarkFilledIcon : bookmarkIcon}
            alt="bookmark"
          />
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
