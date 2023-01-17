import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useFollow } from '../../../hooks/useFollow';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// components
import ConfirmDelete from './ConfirmDelete';

const PostOptionsPopup = ({ type, owner, postData, userData, handlers }) => {
  // type => regular or timeline
  const { follow, unfollow } = useFollow();
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
    await handlers.deletePost(postData.id);
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
              handlers.handleOpenEdit(true);
              handlers.handleClose();
            }}
            className="btn"
          >
            Edit
          </button>
        )}
        {owner && (
          <button
            onClick={() =>
              handlers.toggleDisableLikes(postData.disableLikes, postData.id)
            }
            className="btn"
          >
            {postData.disableLikes ? 'Show' : 'Hide'} Like count
          </button>
        )}
        {owner && (
          <button
            onClick={async () =>
              await handlers.toggleDisableComments(
                postData.disableComments,
                postData.id
              )
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
        <button onClick={() => handlers.handleClose()} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostOptionsPopup;
