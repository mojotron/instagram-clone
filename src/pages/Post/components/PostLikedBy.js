import './styles/PostLikedBy.css';
// icon
import closeIcon from '../../../images/close-icon.svg';
import Avatar from '../../../components/Avatar';
import { useCollectUsers } from '../../../hooks/useCollectUsers';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const PostLikedBy = ({ likes, handleClose }) => {
  const { documents } = useCollectUsers(likes);
  const { response } = useUserDataContext();
  console.log(documents, response);

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
          {/* handlers and button text
              -- follow / unfollow
              -- click to user profile
          */}
          {documents &&
            documents.map((user, i) => {
              const following = response.document.following.find(
                uid => uid === user.uid
              );
              console.log('following', following);
              return (
                <div className="PostLikedBy__user" key={i}>
                  <div className="PostLikedBy__user__info">
                    <Avatar url={user.avatar.url} size="mid" />
                    <div className="PostLikedBy__user__info__names">
                      <h2>{user.userName}</h2>
                      <h3>{user.fullName}</h3>
                    </div>
                  </div>
                  {following && (
                    <button className="btn btn--profile">Following</button>
                  )}
                  {!following && (
                    <button className="btn btn--profile-blue">Follow</button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PostLikedBy;
