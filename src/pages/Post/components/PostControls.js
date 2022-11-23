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

const PostControls = ({ postData, handleCommentReset, handleLikePost }) => {
  // in timlinepost handleCommentReset sends user to post page
  const { response } = useUserDataContext();
  const [showLikedBy, setShowLikedBy] = useState(false);

  const userLikesPost = postData.likes.find(
    like => like.userName === response.document.userName
  );

  const followingLike = postData.likes.find(ele =>
    response.document.following.includes(ele.uid)
  );

  const likesCount = postData.likes.length;

  return (
    <section className="PostControls">
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
        <button className="btn btn--post">
          <img src={bookmarkIcon} alt="bookmark" />
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
