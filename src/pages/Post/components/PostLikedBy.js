import { useState } from 'react';
import './styles/PostLikedBy.css';
// icon
import closeIcon from '../../../images/close-icon.svg';
// components
import ConfirmDelete from './ConfirmDelete';
import Avatar from '../../../components/Avatar';
// hooks

import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useFollow } from '../../../hooks/useFollow';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';

const PostLikedBy = ({ likes, handleClose }) => {
  console.log('likes', likes);
  const { isPending, error, documents } = useCollectDocsByIdList(
    likes,
    'users'
  ); // TODO fetch users
  const { response } = useUserDataContext();
  const { follow, unfollow } = useFollow();

  const [showConfirmUnfollow, setShowConfirmUnfollow] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState(null);

  console.log(documents, response);

  const prepUnfollow = (userDocId, followersList) => {
    setUserToUnfollow({ userDocId, followersList });
    setShowConfirmUnfollow(true);
  };

  const handleUnfollowClick = async () => {
    await unfollow(userToUnfollow.userDocId, userToUnfollow.followersList);
    setShowConfirmUnfollow(false);
    setUserToUnfollow(null);
  };

  return (
    <div className="child-overlay">
      {showConfirmUnfollow && (
        <ConfirmDelete
          btnText="Confirm unfollow"
          handleClose={() => setShowConfirmUnfollow(false)}
          handleDelete={handleUnfollowClick}
        />
      )}

      <div className="PostLikedBy">
        <header className="PostLikedBy__header">
          <h2>Likes</h2>
          <button className="btn" onClick={handleClose}>
            <img src={closeIcon} alt="close liked by" />
          </button>
        </header>
        <div>
          {/* handlers and button text
              -- follow / unfollow
              -- click to user profile
          */}
          {documents &&
            documents.map((user, i) => {
              const following = response.document.following.find(
                uid => uid === user.uid
              );

              return (
                <div className="PostLikedBy__user" key={i}>
                  <div className="PostLikedBy__user__info">
                    <Avatar url={user.avatar.url} size={44} />
                    <div className="PostLikedBy__user__info__names">
                      <h2>{user.userName}</h2>
                      <h3>{user.fullName}</h3>
                    </div>
                  </div>
                  {following && (
                    <button
                      className="btn btn--profile"
                      onClick={() => prepUnfollow(user.uid, user.followers)}
                    >
                      Following
                    </button>
                  )}
                  {!following && (
                    <button
                      className="btn btn--profile-blue"
                      onClick={() => follow(user.uid, user.followers)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PostLikedBy;
