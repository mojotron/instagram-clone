import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// hooks
import { useFollow } from '../../../hooks/useFollow';
import { usePost } from '../../../hooks/usePost';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// components
import ConfirmDelete from './ConfirmDelete';
import PostOptionsPopupButton from './PostOptionsPopupButton';

const PostOptionsPopup = ({
  type,
  postData,
  userData,
  handleClose,
  handleOpenEdit,
}) => {
  // type => regular or timeline
  const { follow, unfollow } = useFollow();
  const { toggleDisableLikes, toggleDisableComments, deletePost } = usePost();
  const { response, toggleModal } = useUserDataContext();
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const owner = postData.uid === response.document.uid;

  useEffect(() => {
    if (isFollowing !== null) return;
    if (!owner) {
      console.log('here');
      setIsFollowing(response.document.following.includes(postData.uid));
    }
  }, [owner, postData, response, isFollowing]);

  const handleDeletePostClick = async () => {
    handleClose();
    toggleModal(null, 'openCreatePost');
    if (type === 'regular') navigate(-1);
    await deletePost(postData.id, postData.images);
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
        {owner && (
          <>
            <PostOptionsPopupButton
              btnText="Delete"
              handleClick={() => setShowConfirmDelete(true)}
              discardBtn={true}
            />
            <PostOptionsPopupButton
              btnText="Edit"
              handleClick={() => {
                handleOpenEdit(true);
                handleClose();
              }}
              discardBtn={false}
            />
            <PostOptionsPopupButton
              btnText={`${postData.disableLikes ? 'Show' : 'Hide'} Like count`}
              handleClick={async () =>
                await toggleDisableLikes(postData.disableLikes, postData.id)
              }
              discardBtn={false}
            />
            <PostOptionsPopupButton
              btnText={`Turn ${
                postData.disableComments ? 'on' : 'off'
              } commenting`}
              handleClick={async () =>
                await toggleDisableComments(
                  postData.disableComments,
                  postData.id
                )
              }
              discardBtn={false}
            />
          </>
        )}

        {!owner && isFollowing && (
          <PostOptionsPopupButton
            btnText="Unfollow"
            handleClick={async () =>
              await unfollow(postData.uid, userData.followers)
            }
            discardBtn={true}
          />
        )}

        {!owner && !isFollowing && (
          <PostOptionsPopupButton
            btnText="Follow"
            handleClick={async () =>
              await follow(postData.uid, userData.document.followers)
            }
            discardBtn={true}
          />
        )}

        <PostOptionsPopupButton
          btnText="Share to..."
          handleClick={() => console.log('TODO')}
          discardBtn={false}
        />
        <PostOptionsPopupButton
          btnText={`Go to ${type === 'regular' ? 'profile' : 'post'}`}
          handleClick={() => {
            type === 'regular'
              ? navigate(`/${postData.creator.userName}`)
              : navigate(`/p/${postData.id}`);
          }}
          discardBtn={false}
        />
        <PostOptionsPopupButton
          btnText="Cancel"
          handleClick={() => handleClose()}
          discardBtn={false}
        />
      </div>
    </div>
  );
};

export default PostOptionsPopup;
