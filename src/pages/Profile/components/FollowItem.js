import './styles/FollowItem.css';
import Avatar from '../../../components/Avatar';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useState } from 'react';
import ConfirmPopup from './ConfirmUnfollow';

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

  const temp = determineButton();

  return (
    <div className="FollowItem">
      {showConfirmPopup && (
        <ConfirmPopup
          text={temp.text === 'remove' ? 'remove' : 'unfollow'}
          targetData={userData}
          handleCancel={() => setShowConfirmPopup(false)}
          handleAction={temp.handler}
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
          className={`btn ${temp.text === 'follow' ? 'btn--blue' : ''}`}
          // follow without confirm popup, remove and unfollow with popup
          onClick={() =>
            temp.text === 'follow' ? temp.handler() : setShowConfirmPopup(true)
          }
        >
          {temp.text}
        </button>
      )}
    </div>
  );
};

export default FollowItem;
