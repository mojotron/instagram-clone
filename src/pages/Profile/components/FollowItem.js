import './styles/FollowItem.css';
import Avatar from '../../../components/Avatar';
import { useNavigate } from 'react-router-dom';

const FollowItem = ({ user, type, userData, followHandlers }) => {
  const navigate = useNavigate();

  return (
    <div className="FollowItem">
      <div
        className="FollowItem__user"
        onClick={() => navigate(`/${userData.userName}`)}
      >
        <Avatar url={userData.avatar.url} size="mid" />
        <div className="FollowItem__user__name">
          <h2>{userData.userName}</h2>
          <h3>{userData.fullName}</h3>
        </div>
      </div>
      <button
        className="btn"
        onClick={() => {
          console.log('yo');
          // mainHandler(userData.uid, userData.following, userData.id)
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default FollowItem;
