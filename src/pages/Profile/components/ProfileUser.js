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

const ProfileUser = ({ targetData, accountType }) => {
  console.log('data for profile user', targetData);
  const { isPending, error, document } = targetData.response;

  const { follow, unfollow, removeFollower } = useFollow();

  const navigate = useNavigate();
  const { screenSize } = useScreenSizeContext();

  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const [showConfirmUnfollow, setShowConfirmUnfollow] = useState(false);

  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const toggleUpdateAvatar = () =>
    setShowChangeProfilePhoto(oldvalue => !oldvalue);

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
          handleAction={() => unfollow(document.uid, document.followers)}
        />
      )}

      {showFollowerList && (
        <FollowerList
          type="followers"
          targetList={document.followers}
          //TODO followHandlers={handlers}
          closeHandler={() => setShowFollowerList(false)}
        />
      )}
      {showFollowingList && (
        <FollowerList
          type="following"
          targetList={document.following}
          //TODO followHandlers={handlers}
          closeHandler={() => setShowFollowingList(false)}
        />
      )}

      <div className="Profile__user__avatar" title="Change profile photo">
        <Avatar
          url={document.avatar.url}
          size={screenSize === 'small' ? 77 : 150}
          handleClick={toggleUpdateAvatar}
        />
      </div>
      <div className="Profile__user__info">
        <div>
          <h2>{document.userName}</h2>

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
                onClick={() => follow(document.uid, document.followers)}
                className="btn btn--profile-blue"
              >
                Follow
              </button>
            </>
          )}
        </div>
        <div>
          <FormatCount num={document.posts.length} title="post" />
          <FormatCount
            num={document.followers.length}
            title="follower"
            handleClick={() => setShowFollowerList(true)}
          />
          <FormatCount
            num={document.following.length}
            title="following"
            handleClick={() => setShowFollowingList(true)}
          />
        </div>
        <div>
          <p>{document.fullName}</p>
          <p>{document.bio}</p>
          <p>{document.website}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileUser;
