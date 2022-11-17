import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../../hooks/useFirestore';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// test
import { usePostHandlers } from '../../../hooks/usePostHandlers';

const PostOptionsPopup = ({
  type,
  owner,
  postData,
  handleClose,
  handleOpenEdit,
}) => {
  // type => regular or timeline
  const navigate = useNavigate();
  const { response } = useUserDataContext();

  const {
    followProfile,
    unfollowProfile,
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
  } = usePostHandlers(owner);

  const { response: profileData, getDocumentById } = useFirestore('users');

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
      console.log('here');
      setIsFollowing(response.document.following.includes(postData.uid));
    }
  }, [owner, postData, response, isFollowing]);

  return (
    <div className="child-overlay">
      <div className="DiscardPost">
        {/* TODO follow unfollow */}
        {owner && (
          <button
            onClick={async () => {
              await deletePost(postData.id);
              if (type === 'regular') navigate(`/${postData.creator.userName}`);
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
              handleOpenEdit(true);
              handleClose();
            }}
            className="btn"
          >
            Edit
          </button>
        )}
        {owner && (
          <button
            onClick={() =>
              toggleDisableLikes(postData.disableLikes, postData.id)
            }
            className="btn"
          >
            {postData.disableLikes ? 'Show' : 'Hide'} Like count
          </button>
        )}
        {owner && (
          <button
            onClick={async () =>
              await toggleDisableComments(postData.disableComments, postData.id)
            }
            className="btn"
          >
            Turn {postData.disableComments ? 'on' : 'off'} commenting
          </button>
        )}

        {!owner && isFollowing && (
          <button
            onClick={async () =>
              await unfollowProfile(
                postData.uid,
                profileData.document.followers,
                postData.creator.profileDocId
              )
            }
            className="btn discard"
            style={{ border: 'none' }}
          >
            Unfollow
          </button>
        )}

        {!owner && !isFollowing && (
          <button
            onClick={async () =>
              await followProfile(
                postData.uid,
                profileData.document.followers,
                postData.creator.profileDocId
              )
            }
            className="btn discard"
            style={{ border: 'none' }}
          >
            Follow
          </button>
        )}

        <button className="btn">Share to...</button>
        <button
          onClick={() => {
            type === 'regular'
              ? navigate(`/${postData.creator.userName}`)
              : navigate(`/p/${postData.id}`);
          }}
          className="btn"
        >
          Go to {type === 'regular' ? 'profile' : 'post'}
        </button>
        <button onClick={() => handleClose()} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostOptionsPopup;
