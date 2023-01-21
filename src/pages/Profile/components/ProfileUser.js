import { useState } from 'react';
// react router
import { useNavigate } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ConfirmPopup from './ConfirmPopup';
import ChangeProfilePhoto from '../../../components/ChangeProfilePhoto';
import FormatCount from './FormatCount';
import FollowerList from './FollowerList';
// style
import './styles/ProfileUser.css';
// hooks
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
import { useFollow } from '../../../hooks/useFollow';

const ProfileUser = ({ targetData, profileType, setProfileType }) => {
  const { follow, unfollow } = useFollow();

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
        {/* controls depending on profile type */}
        <div>
          <h2>{targetData.userName}</h2>

          {profileType === 'own' && (
            <button
              className="btn btn--profile"
              onClick={() => navigate('/settings')}
              style={{ margin: '0px 10px' }}
            >
              Edit profile
            </button>
          )}

          {profileType === 'friend' && (
            <>
              <button className="btn btn--profile">Message</button>
              <button
                className="btn btn--profile"
                onClick={() => setShowConfirmUnfollow(true)}
              >
                Unfollow
              </button>
            </>
          )}

          {profileType === 'other' && (
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
          {/* counters */}
          <FormatCount
            num={targetData.posts.length}
            title="post"
            handleClick={null}
          />
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
        {/* personal information */}
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
