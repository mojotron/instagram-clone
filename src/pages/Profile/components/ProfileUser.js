import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import ChangeProfilePhoto from '../../../components/ChangeProfilePhoto';
import './styles/ProfileUser.css';
import userCheckIcon from '../../../images/user-check-icon.svg';

const ProfileUser = ({ userData, accountType, postsCount }) => {
  const navigate = useNavigate();
  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const toggleUpdateAvatar = () =>
    setShowChangeProfilePhoto(oldvalue => !oldvalue);
  return (
    <section className="Profile__user">
      {showChangeProfilePhoto && (
        <ChangeProfilePhoto
          userId={userData.uid}
          userAvatar={userData.avatar}
          handleDisplay={toggleUpdateAvatar}
        />
      )}

      <div className="Profile__user__avatar" title="Change profile photo">
        <Avatar
          url={userData.avatar.url}
          size="big"
          handleClick={toggleUpdateAvatar}
        />
      </div>
      <div className="Profile__user__info">
        <div>
          <h2>{userData.userName}</h2>

          {accountType === 'own' && (
            <button
              className="btn btn--profile"
              onClick={() => navigate('/settings')}
            >
              Edit profile
            </button>
          )}

          {accountType === 'friend' && (
            <>
              <button className="btn btn--profile">Message</button>
              <button className="btn btn--profile icon">
                <img src={userCheckIcon} alt="un follow account" />
              </button>
            </>
          )}

          {accountType === 'other' && (
            <>
              <button className="btn btn--profile">Message</button>
              <button className="btn btn--profile-blue">Follow</button>
            </>
          )}
        </div>
        <div>
          <p>
            <span>{postsCount}</span> posts
          </p>
          <p>
            <span>{userData.followers.length}</span> followers
          </p>
          <p>
            <span>{userData.following.length}</span> following
          </p>
        </div>
        <div>
          <p>{userData.name}</p>
          <p>{userData.bio}</p>
          <p>{userData.website}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileUser;
