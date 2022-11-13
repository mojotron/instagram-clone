import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const PostOptionsPopup = ({ owner, postData, handlers }) => {
  const navigate = useNavigate();
  const { response, updateDocument } = useUserDataContext();

  const {
    response: profileData,
    getDocumentById,
    updateDocument: updateProfile,
  } = useFirestore('users');

  const loadDocument = useRef(() =>
    getDocumentById(postData.creator.profileDocId)
  ).current;

  useEffect(() => {
    if (owner) return;
    loadDocument();
  }, [owner, loadDocument]);

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

    await updateProfile(postData.creator.profileDocId, {
      followers: inspectingAccFollowers,
    });
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

    await updateProfile(postData.creator.profileDocId, {
      followers: inspectingAccFollowers,
    });
    await updateDocument(response.document.id, { following: ownAccFollowing });
  };

  return (
    <div className="child-overlay">
      <div className="DiscardPost">
        {/* TODO follow unfollow */}
        {owner && (
          <button
            onClick={async () => {
              await handlers.deletePost();
              navigate(`/${postData.creator.userName}`);
            }}
            className="btn discard"
            style={{ border: 'none' }}
          >
            Delete
          </button>
        )}
        {owner && (
          <button
            onClick={() => {
              handlers.openEdit(true);
              handlers.close();
            }}
            className="btn"
          >
            Edit
          </button>
        )}
        {owner && (
          <button onClick={handlers.disableLikes()} className="btn">
            {postData.disableLikes ? 'Show' : 'Hide'} Like count
          </button>
        )}
        {owner && (
          <button onClick={() => handlers.disableComments()} className="btn">
            Turn {postData.disableComments ? 'on' : 'off'} commenting
          </button>
        )}

        {!owner && isFollowing && (
          <button
            onClick={handleUnfollow}
            className="btn discard"
            style={{ border: 'none' }}
          >
            Unfollow
          </button>
        )}

        {!owner && !isFollowing && (
          <button
            onClick={handleFollow}
            className="btn discard"
            style={{ border: 'none' }}
          >
            Follow
          </button>
        )}

        <button className="btn">Share to...</button>
        <button
          onClick={() => navigate(`/${postData.creator.userName}`)}
          className="btn"
        >
          Go to profile
        </button>
        <button onClick={() => handlers.close()} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostOptionsPopup;
