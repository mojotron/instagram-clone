import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// style
import './styles/FollowItem.css';
// components
import Avatar from '../../../components/Avatar';
import ConfirmPopup from './ConfirmPopup';
// hooks
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useFollow } from '../../../hooks/useFollow';

const FollowItem = ({ type, userData }) => {
  const { response } = useUserDataContext();
  const { follow, unfollow, removeFollower } = useFollow();
  const { userName } = useParams(); // to determine if user inspecting own account
  const navigate = useNavigate();

  const isOwnAcc = userName === response.document.userName;

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const determineButton = () => {
    if (isOwnAcc && type === 'followers')
      return {
        text: 'remove',
        handler: () => removeFollower(userData.uid, userData.following),
      };
    if (isOwnAcc && type === 'following')
      return {
        text: 'following',
        handler: () => unfollow(userData.uid, userData.followers),
      };
    if (!isOwnAcc && type === 'followers') {
      if (response.document.following.includes(userData.uid)) {
        return {
          text: 'following',
          handler: () => unfollow(userData.uid, userData.followers),
        };
      } else {
        return {
          text: 'follow',
          handler: () => follow(userData.uid, userData.followers),
        };
      }
    }
    if (!isOwnAcc && type === 'following') {
      if (response.document.following.includes(userData.uid)) {
        return {
          text: 'following',
          handler: () => unfollow(userData.uid, userData.followers),
        };
      } else {
        return {
          text: 'follow',
          handler: () => follow(userData.uid, userData.followers),
        };
      }
    }
  };

  const currentButton = determineButton();

  return (
    <div className="FollowItem">
      {showConfirmPopup && (
        <ConfirmPopup
          text={currentButton.text === 'remove' ? 'remove' : 'unfollow'}
          targetData={userData}
          handleCancel={() => setShowConfirmPopup(false)}
          handleAction={currentButton.handler}
        />
      )}

      <div
        className="FollowItem__user"
        onClick={() => navigate(`/${userData.userName}`)}
      >
        <Avatar url={userData.avatar.url} size={35} />
        <div className="FollowItem__user__name">
          <h2>{userData.userName}</h2>
          <h3>{userData.fullName}</h3>
        </div>
      </div>
      {userData.userName !== response.document.userName && (
        <button
          className={`btn ${
            currentButton.text === 'follow' ? 'btn--blue' : ''
          }`}
          // follow without confirm popup, remove and unfollow with popup
          onClick={() =>
            currentButton.text === 'follow'
              ? currentButton.handler()
              : setShowConfirmPopup(true)
          }
        >
          {currentButton.text}
        </button>
      )}
    </div>
  );
};

export default FollowItem;
