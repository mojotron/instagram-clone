import { useState } from 'react';
// react router
import { useNavigate } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ConfirmUnfollow from './ConfirmUnfollow';
import ChangeProfilePhoto from '../../../components/ChangeProfilePhoto';
import FormatCount from './FormatCount';
// style
import './styles/ProfileUser.css';
// icons
import userCheckIcon from '../../../images/user-check-icon.svg';
import FollowerList from './FollowerList';

const ProfileUser = ({
  userData,
  targetData,
  accountType,
  postsCount,
  handlers,
}) => {
  const navigate = useNavigate();
  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const [showConfirmUnfollow, setShowConfirmUnfollow] = useState(false);

  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const toggleUpdateAvatar = () =>
    setShowChangeProfilePhoto(oldvalue => !oldvalue);

  return (
    <section className="Profile__user">
      {showChangeProfilePhoto && (
        <ChangeProfilePhoto
          userId={targetData.uid}
          userAvatar={targetData.avatar}
          handleDisplay={toggleUpdateAvatar}
        />
      )}

      {showConfirmUnfollow && (
        <ConfirmUnfollow
          targetData={targetData}
          handleCancel={() => setShowConfirmUnfollow(false)}
          handleUnfollowAccount={handlers.unfollow}
        />
      )}

      {showFollowerList && (
        <FollowerList
          user={userData.uid === targetData.uid}
          type="followers"
          userList={userData.followers}
          targetList={targetData.followers}
          followHandlers={handlers}
          closeHandler={() => setShowFollowerList(false)}
        />
      )}
      {showFollowingList && (
        <FollowerList
          user={userData.uid === targetData.uid}
          type="following"
          userList={userData.following}
          targetList={targetData.following}
          followHandlers={handlers}
          closeHandler={() => setShowFollowingList(false)}
        />
      )}

      <div className="Profile__user__avatar" title="Change profile photo">
        <Avatar
          url={targetData.avatar.url}
          size="big"
          handleClick={toggleUpdateAvatar}
        />
      </div>
      <div className="Profile__user__info">
        <div>
          <h2>{targetData.userName}</h2>

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
              <button
                className="btn btn--profile icon"
                onClick={() => setShowConfirmUnfollow(true)}
              >
                <img src={userCheckIcon} alt="unfollow account" />
              </button>
            </>
          )}

          {accountType === 'other' && (
            <>
              <button className="btn btn--profile">Message</button>
              <button
                onClick={handlers.follow}
                className="btn btn--profile-blue"
              >
                Follow
              </button>
            </>
          )}
        </div>
        <div>
          <FormatCount num={postsCount} title="post" />
          <FormatCount
            num={targetData.followers.length}
            title="follower"
            handleClick={() => setShowFollowerList(true)}
          />
          <FormatCount
            num={targetData.following.length}
            title="following"
            handleClick={() => setShowFollowingList(true)}
          />
        </div>
        <div>
          <p>{targetData.name}</p>
          <p>{targetData.bio}</p>
          <p>{targetData.website}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileUser;
