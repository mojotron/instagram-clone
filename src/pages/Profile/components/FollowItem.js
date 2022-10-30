import './styles/FollowItem.css';
import Avatar from '../../../components/Avatar';

const FollowItem = ({ userData }) => {
  return (
    <div className="FollowItem">
      <div className="FollowItem__user">
        <Avatar url={userData.avatar.url} size="mid" />
        <div className="FollowItem__user__name">
          <h2>{userData.userName}</h2>
          <h3>{userData.fullName}</h3>
        </div>
      </div>
      <button className="btn">Remove</button>
    </div>
  );
};

export default FollowItem;
