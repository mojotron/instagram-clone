// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../../../hooks/useFollow';
import { usePost } from '../../../hooks/usePost';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useFirestore } from '../../../hooks/useFirestore';
import { useMessages } from '../../../hooks/useMessages';
// components
import ConfirmDelete from './ConfirmDelete';
import PostOptionsPopupButton from './PostOptionsPopupButton';
import NewMessage from '../../Messages/components/NewMessage';

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
  const { getDocumentByIdAndCollectionName } = useFirestore('users');
  const { addMessage } = useMessages();

  const [isFollowing, setIsFollowing] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const owner = postData.uid === response.document.uid;

  useEffect(() => {
    if (isFollowing !== null) return;
    if (!owner) {
      setIsFollowing(response.document.following.includes(postData.uid));
    }
  }, [owner, postData, response, isFollowing]);

  const handleSendPostTo = async user => {
    // find message doc
    const userDoc = await getDocumentByIdAndCollectionName('users', user);
    const messageTo = response.document.messages.find(
      msg => msg.messageTo === user
    );
    const messageDoc = await getDocumentByIdAndCollectionName(
      'messages',
      messageTo?.messageDocId
    );

    await addMessage(messageDoc, userDoc, 'post-message', postData.id);
  };

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

      {showNewMessage && (
        <NewMessage
          setShowNewMessage={setShowNewMessage}
          setMessageTo={handleSendPostTo}
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
          handleClick={() => {
            setShowNewMessage(true);
          }}
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
