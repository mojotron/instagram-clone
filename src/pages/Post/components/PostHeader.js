import './styles/PostHeader.css';
import Avatar from '../../../components/Avatar';
import { useNavigate } from 'react-router-dom';
import moreOptionsIcon from '../../../images/more-horiz-icon.svg';
import PostOptionsPopup from './PostOptionsPopup';
import EditPostPanel from './EditPostPanel';
import { useState, useEffect, useRef } from 'react';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useFirestore } from '../../../hooks/useFirestore';

const PostHeader = ({
  owner,
  postData,
  avatarUrl,
  userName,
  handlers,
  profileDocId,
}) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  const {
    response: profileData,
    getDocumentById,
    updateDocument: updateProfile,
  } = useFirestore('users');
  const loadDocument = useRef(() => getDocumentById(profileDocId)).current;

  useEffect(() => {
    if (owner) return;
    loadDocument();
  }, [owner, loadDocument]);

  const { response, updateDocument } = useUserDataContext();
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    if (isFollowing !== null) return;
    if (!owner) {
      setIsFollowing(response.document.following.includes(postData.uid));
    }
  }, [owner, postData, response, isFollowing]);

  const handleFollow = async () => {
    // add target uid to owner following
    const ownAccFollowing = [...response.document.following, postData.uid];
    // add owner uid to target followers
    const inspectingAccFollowers = [
      ...profileData.document.followers,
      response.document.uid,
    ];

    await updateProfile(profileDocId, { followers: inspectingAccFollowers });
    await updateDocument(response.document.id, { following: ownAccFollowing });
  };

  const handleUnfollow = async () => {
    // remove target uid from owner following
    const ownAccFollowing = response.document.following.filter(
      item => item !== postData.uid
    );
    // remove owner uid from target followers
    const inspectingAccFollowers = profileData.document.followers.filter(
      item => item !== response.document.uid
    );

    await updateProfile(profileDocId, { followers: inspectingAccFollowers });
    await updateDocument(response.document.id, { following: ownAccFollowing });
  };

  return (
    <header className="PostHeader">
      {showOptions && (
        <PostOptionsPopup
          userName={userName}
          owner={owner}
          postData={postData}
          handlers={{
            ...handlers,
            close: () => setShowOptions(false),
            openEdit: setShowEditPost,
            follow: handleFollow,
            unfollow: handleUnfollow,
          }}
          isFollowing={isFollowing}
        />
      )}

      {showEditPost && (
        <EditPostPanel
          postData={postData}
          closeHandler={() => setShowEditPost(false)}
          editPostHandler={handlers.editPost}
        />
      )}

      <div className="PostHeader__left">
        <Avatar
          url={avatarUrl}
          size="mid"
          handleClick={() => navigate(`/${userName}`)}
        />
        <h2 onClick={() => navigate(`/${userName}`)}>{userName}</h2>
      </div>

      <button className="btn btn--options" onClick={() => setShowOptions(true)}>
        <img src={moreOptionsIcon} alt="post option" />
      </button>
    </header>
  );
};

export default PostHeader;
