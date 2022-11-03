// icons
import heartIcon from '../../../images/heart-icon.svg';
import heartLikedIcon from '../../../images/heart-red-icon.svg';
import commentIcon from '../../../images/comment-outline-icon.svg';
import sendIcon from '../../../images/send-icon.svg';
import bookmarkIcon from '../../../images/bookmark-icon.svg';
import bookmarkFilledIcon from '../../../images/bookmark-icon-filled.svg';
import smilyIcon from '../../../images/smile-icon.svg';
// style
import './styles/PostControls.css';

const PostControls = () => {
  return (
    <section className="PostControls">
      <div className="PostControls__icons">
        <div className="PostControls__icons__left">
          <button className="btn btn--post">
            <img src={heartIcon} alt="like" />
          </button>
          <button className="btn btn--post">
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
      <div className="PostControls__liked-by">
        Liked by <span>Mojo</span> and <span>5 others</span>
      </div>
      <div className="PostControls__created-at">2 day ago</div>
    </section>
  );
};

export default PostControls;
