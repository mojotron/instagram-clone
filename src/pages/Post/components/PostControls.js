// icons
import heartIcon from '../../../images/heart-icon.svg';
import heartLikedIcon from '../../../images/heart-red-icon.svg';
import commentIcon from '../../../images/comment-outline-icon.svg';
import sendIcon from '../../../images/send-icon.svg';
import bookmarkIcon from '../../../images/bookmark-icon.svg';
import bookmarkFilledIcon from '../../../images/bookmark-icon-filled.svg';
// style
import './styles/PostControls.css';

import { useUserDataContext } from '../../../hooks/useUserDataContext';

const PostControls = ({
  likes,
  handleToggleLike,
  setFocusOnComment,
  createdAt,
}) => {
  const { response } = useUserDataContext();
  const userLikesPost = likes.find(
    like => like.userName === response.document.userName
  );

  const handleLikeClick = () => {
    // save likes with username and uid, for easier display of friends that liked post
    // uid is for filtering following list and usernames are for displaying who followed
    handleToggleLike(
      !userLikesPost,
      response.document.userName,
      response.document.uid
    );
  };

  const followingLikes = likes.filter(ele =>
    response.document.following.includes(ele.uid)
  );

  console.log(followingLikes);

  return (
    <section className="PostControls">
      <div className="PostControls__icons">
        <div className="PostControls__icons__left">
          <button className="btn btn--post" onClick={handleLikeClick}>
            <img src={userLikesPost ? heartLikedIcon : heartIcon} alt="like" />
          </button>
          <button className="btn btn--post" onClick={setFocusOnComment}>
            <img src={commentIcon} alt="comment" />
          </button>
          <button className="btn btn--post">
            <img src={sendIcon} alt="send" />
          </button>
        </div>
        <button className="btn btn--post">
          <img src={bookmarkIcon} alt="bookmark" />
        </button>
      </div>

      {likes.length > 0 && (
        <div className="PostControls__liked-by">
          Liked by <span>{followingLikes[0].userName}</span>
          <span>
            {followingLikes > 1
              ? `and ${followingLikes.length - 1} others`
              : ''}
          </span>
        </div>
      )}

      <div className="PostControls__created-at">
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
          .format(new Date(createdAt * 1000))
          .toUpperCase()}
      </div>
    </section>
  );
};

export default PostControls;
