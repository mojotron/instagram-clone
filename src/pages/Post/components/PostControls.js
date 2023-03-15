// icons
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
// style
import './styles/PostControls.css';
// hooks
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useState } from 'react';
import { useMessages } from '../../../hooks/useMessages';
import { usePost } from '../../../hooks/usePost';
import { useFirestore } from '../../../hooks/useFirestore';
// component
import PostLikedBy from './PostLikedBy';
import NewMessage from '../../Messages/components/NewMessage';

const PostControls = ({ postData, handleCommentReset }) => {
  // in timeline post handleCommentReset sends user to post page
  const { response } = useUserDataContext();
  const { toggleSavePost, toggleLike } = usePost();
  const { getDocumentByIdAndCollectionName } = useFirestore('users');
  const { addMessage } = useMessages();

  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showLikedBy, setShowLikedBy] = useState(false);
  // is current user liking post
  const userLikesPost = postData.likes.find(
    like => like.userName === response.document.userName
  );
  // find all users from your following list who likes this post
  const followingLike = postData.likes.find(ele =>
    response.document.following.includes(ele.uid)
  );
  const likesCount = postData.likes.length;
  // is current user saved this post
  const userSavedPost = response.document.savedPosts.includes(postData.id);
  // send this post to the target user

  // TODO with messages refactor
  const handleSendPostTo = async user => {
    // find message doc
    console.log(user);
    const userDoc = await getDocumentByIdAndCollectionName('users', user);
    console.log(userDoc);
    const messageTo = response.document.messages.find(
      msg => msg.messageTo === user
    );
    const messageDoc = await getDocumentByIdAndCollectionName(
      'messages',
      messageTo?.messageDocId
    );
    console.log(messageDoc);
    // get user doc
    // get message doc for that user

    await addMessage(messageDoc, userDoc, 'post-message', postData.id);
  };

  return (
    <section className="PostControls">
      {showNewMessage && (
        <NewMessage
          setShowNewMessage={setShowNewMessage}
          setMessageTo={handleSendPostTo}
        />
      )}

      {showLikedBy && (
        <PostLikedBy
          // likes map here to stop infinite rerender
          likes={postData.likes.map(ele => ele.uid)}
          handleClose={() => setShowLikedBy(false)}
        />
      )}

      <div className="PostControls__icons">
        <div className="PostControls__icons__left">
          {!postData.disableLikes && (
            <button
              className="btn btn--post"
              onClick={async () =>
                await toggleLike(
                  postData.likes,
                  postData.id,
                  response.document.id
                )
              }
            >
              {userLikesPost ? (
                <AiFillHeart size={25} color="#eb6161" />
              ) : (
                <AiOutlineHeart size={25} />
              )}
            </button>
          )}
          {!postData.disableComments && (
            <button className="btn btn--post" onClick={handleCommentReset}>
              <BiComment size={25} />
            </button>
          )}
          <button
            className="btn btn--post"
            onClick={() => setShowNewMessage(true)}
          >
            <FiSend size={25} />
          </button>
        </div>
        <button
          className="btn btn--post"
          onClick={async () => await toggleSavePost(userSavedPost, postData.id)}
        >
          {userSavedPost ? (
            <BsFillBookmarkFill size={25} />
          ) : (
            <BsBookmark size={25} />
          )}
        </button>
      </div>

      {followingLike && (
        <button
          className="btn PostControls__liked-by"
          onClick={() => setShowLikedBy(true)}
          style={{ display: 'inline-block' }}
        >
          Liked by{' '}
          <span style={{ display: 'inline-block' }}>
            {followingLike.userName}
          </span>
          <span>{likesCount > 1 ? ` and ${likesCount - 1} others` : ''}</span>
        </button>
      )}

      {!followingLike && likesCount > 0 && (
        <button
          className="btn PostControls__liked-by"
          onClick={() => setShowLikedBy(true)}
        >
          <span>{likesCount} </span>
          <span>{likesCount > 1 ? 'likes' : 'like'}</span>
        </button>
      )}

      <div className="PostControls__created-at">
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
          .format(new Date(postData.createdAt.seconds * 1000))
          .toUpperCase()}
      </div>
    </section>
  );
};

export default PostControls;
