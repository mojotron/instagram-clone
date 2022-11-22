import './styles/PostLikedBy.css';
// icon
import closeIcon from '../../../images/close-icon.svg';
import Avatar from '../../../components/Avatar';
import { useCollectUsers } from '../../../hooks/useCollectUsers';

const PostLikedBy = ({ likes, handleClose }) => {
  const { documents } = useCollectUsers(likes);
  console.log(documents);

  return (
    <div className="child-overlay">
      <div className="PostLikedBy">
        <header className="PostLikedBy__header">
          <h2>Likes</h2>
          <button className="btn" onClick={handleClose}>
            <img src={closeIcon} alt="close liked by" />
          </button>
        </header>
        <div>
          {documents &&
            documents.map((user, i) => (
              <div className="PostLikedBy__user" key={i}>
                <Avatar url={user.avatar.url} size="mid" />
                <h2>{user.userName}</h2>
                <button>Follow</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostLikedBy;
