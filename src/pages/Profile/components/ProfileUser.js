import { useState } from 'react';
// react router
import { useNavigate } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ConfirmPopup from './ConfirmPopup';
import ChangeProfilePhoto from '../../../components/ChangeProfilePhoto';
import FormatCount from './FormatCount';
// style
import './styles/ProfileUser.css';
// icons
import userCheckIcon from '../../../images/user-check-icon.svg';
import FollowerList from './FollowerList';
// hooks
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
import { useFollow } from '../../../hooks/useFollow';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const ProfileUser = ({ targetData, accountType, setProfileType }) => {
  const { follow, unfollow, removeFollower } = useFollow();
  const { response } = useUserDataContext();

  const navigate = useNavigate();
  const { screenSize } = useScreenSizeContext();

  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const [showConfirmUnfollow, setShowConfirmUnfollow] = useState(false);

  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const toggleUpdateAvatar = () =>
    setShowChangeProfilePhoto(oldValue => !oldValue);

  return (
    <section className="Profile__user">
      {showChangeProfilePhoto && (
        <ChangeProfilePhoto handleDisplay={toggleUpdateAvatar} />
      )}

      {showConfirmUnfollow && (
        <ConfirmPopup
          text="unfollow"
          targetData={targetData}
          handleCancel={() => setShowConfirmUnfollow(false)}
          handleAction={async () => {
            await unfollow(targetData.uid, targetData.followers);
            setProfileType('other');
          }}
        />
      )}

      {showFollowerList && (
        <FollowerList
          type="followers"
          userIdList={targetData.followers}
          closeHandler={() => setShowFollowerList(false)}
        />
      )}
      {showFollowingList && (
        <FollowerList
          type="following"
          userIdList={targetData.following}
          closeHandler={() => setShowFollowingList(false)}
        />
      )}

      <div className="Profile__user__avatar" title="Change profile photo">
        <Avatar
          url={targetData.avatar.url}
          size={screenSize === 'small' ? 77 : 150}
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
              style={{ margin: '0px 10px' }}
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
                onClick={async () => {
                  await follow(targetData.uid, targetData.followers);
                  setProfileType('friend');
                }}
                className="btn btn--profile-blue"
              >
                Follow
              </button>
            </>
          )}
        </div>
        <div>
          <FormatCount num={targetData.posts.length} title="post" />
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
          <p>{targetData.fullName}</p>
          <p>{targetData.bio}</p>
          <p>{targetData.website}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileUser;
