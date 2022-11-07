import './styles/FollowItem.css';
import Avatar from '../../../components/Avatar';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useState } from 'react';
import ConfirmPopup from './ConfirmPopup';

const FollowItem = ({ type, userData, followHandlers }) => {
  const { response } = useUserDataContext();
  const { userName } = useParams(); // to determine if user inspecting own account
  const navigate = useNavigate();

  const isOwnAcc = userName === response.document.userName;
  console.log(userData.followers);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const determineButton = () => {
    if (isOwnAcc && type === 'followers')
      return {
        text: 'remove',
        handler: () =>
          followHandlers.remove(userData.uid, userData.following, userData.id),
      };
    if (isOwnAcc && type === 'following')
      return {
        text: 'following',
        handler: () =>
          followHandlers.unfollow(
            userData.uid,
            userData.followers,
            userData.id
          ),
      };
    if (!isOwnAcc && type === 'followers') {
      if (response.document.following.includes(userData.uid)) {
        return {
          text: 'following',
          handler: () =>
            followHandlers.unfollow(
              userData.uid,
              userData.followers,
              userData.id
            ),
        };
      } else {
        return {
          text: 'follow',
          handler: () =>
            followHandlers.follow(
              userData.uid,
              userData.followers,
              userData.id
            ),
        };
      }
    }
    if (!isOwnAcc && type === 'following') {
      if (response.document.following.includes(userData.uid)) {
        return {
          text: 'following',
          handler: () =>
            followHandlers.unfollow(
              userData.uid,
              userData.followers,
              userData.id
            ),
        };
      } else {
        return {
          text: 'follow',
          handler: () =>
            followHandlers.follow(
              userData.uid,
              userData.followers,
              userData.id
            ),
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
        <Avatar url={userData.avatar.url} size="mid" />
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
