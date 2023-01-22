import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useFollow } from '../../../hooks/useFollow';
import { usePost } from '../../../hooks/usePost';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// components
import ConfirmDelete from './ConfirmDelete';

const PostOptionsPopup = ({
  type,
  owner,
  postData,
  userData,
  handleClose,
  handleOpenEdit,
}) => {
  // type => regular or timeline
  const { follow, unfollow } = useFollow();
  const { toggleDisableLikes, toggleDisableComments, deletePost } = usePost();

  const { response } = useUserDataContext();
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    if (isFollowing !== null) return;
    if (!owner) {
      console.log('here');
      setIsFollowing(response.document.following.includes(postData.uid));
    }
  }, [owner, postData, response, isFollowing]);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeletePostClick = async () => {
    await deletePost(postData.id);
    if (type === 'regular') navigate(`/${postData.creator.userName}`);
  };

  return (
    <div className="child-overlay">
      {showConfirmDelete && (
        <ConfirmDelete
          btnText="Delete"
          handleClose={() => setShowConfirmDelete(false)}
          handleDelete={handleDeletePostClick}
        />
      )}

      <div className="DiscardPost">
        {/* TODO follow unfollow */}
        {owner && (
          <button
            onClick={() => setShowConfirmDelete(true)}
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
              await unfollow(postData.uid, userData.followers)
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
              await follow(postData.uid, userData.document.followers)
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
