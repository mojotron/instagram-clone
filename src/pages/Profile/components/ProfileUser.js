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
import { useLogout } from '../../../hooks/useLogout';

const ProfileUser = ({ targetData, profileType, setProfileType }) => {
  const { follow, unfollow } = useFollow();

  const navigate = useNavigate();
  const { isPending, logout } = useLogout();
  const { screenSize } = useScreenSizeContext();

  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const [showConfirmUnfollow, setShowConfirmUnfollow] = useState(false);

  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const toggleUpdateAvatar = () =>
    setShowChangeProfilePhoto(oldValue => !oldValue);

  return (
    <section
      className="Profile__user"
      style={
        screenSize === 'small'
          ? { flexDirection: 'column' }
          : { flexDirection: 'row', paddingBottom: '3rem' }
      }
    >
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
      <div
        className="Profile__user__info"
        style={{
          marginLeft: screenSize === 'small' ? '0' : '3rem',
        }}
      >
        {/* controls depending on profile type */}
        <div
          style={
            screenSize === 'small'
              ? {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  bottom: '8rem',
                  left: '10rem',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: '3rem',
                }
          }
        >
          <h2
            style={
              screenSize === 'small'
                ? { fontSize: '2rem', paddingBottom: '1rem' }
                : { fontSize: '3rem' }
            }
          >
            {targetData.userName}
          </h2>
          <div>
            {profileType === 'own' && (
              <button
                className="btn btn--profile"
                onClick={() => navigate('/settings')}
                style={{ margin: '0px 10px' }}
              >
                Edit profile
              </button>
            )}

            {screenSize === 'small' && profileType === 'own' && (
              <button
                className="btn btn--profile"
                onClick={logout}
                style={{ margin: '10px 10px 0' }}
              >
                {isPending ? 'Signing out...' : 'Logout'}
              </button>
            )}
          </div>

          {profileType === 'friend' && (
            <>
              <button
                className="btn btn--profile"
                onClick={() =>
                  navigate('/direct', {
                    state: { messageTo: `${targetData.uid}` },
                  })
                }
              >
                Message
              </button>
              <button
                className="btn btn--profile"
                onClick={() => setShowConfirmUnfollow(true)}
                style={{
                  margin: screenSize === 'small' ? '10px 0 0' : '0 0 0 10px',
                }}
              >
                Unfollow
              </button>
            </>
          )}

          {profileType === 'other' && (
            <>
              <button
                className="btn btn--profile"
                onClick={() =>
                  navigate('/direct', {
                    state: { messageTo: `${targetData.uid}` },
                  })
                }
              >
                Message
              </button>

              <button
                onClick={async () => {
                  await follow(targetData.uid, targetData.followers);
                  setProfileType('friend');
                }}
                className="btn btn--profile-blue"
                style={{
                  margin: screenSize === 'small' ? '10px 0 0' : '0 0 0 10px',
                }}
              >
                Follow
              </button>
            </>
          )}
        </div>
        <div style={{ paddingBottom: '2rem' }}>
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
