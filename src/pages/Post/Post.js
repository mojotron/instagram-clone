import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/Post.css';
// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';
import PostAddComment from './components/PostAddComment';
import PostCommentsList from './components/PostCommentsList';
// hooks
import { usePostControl } from '../../hooks/usePostControl';
import { useUserDataContext } from '../../hooks/useUserDataContext';
// icon
import closeIcon from '../../images/close-icon.svg';

const Post = () => {
  // type: regular, timeline
  const { response: userData, updateDocument } = useUserDataContext();
  // data minimum data needed to get post document (postID, owner username and avatar url)

  const { postId } = useParams();

  const navigate = useNavigate();

  // post document
  const {
    postResponse,
    addComment,
    toggleLike,
    addReplay,
    deleteComment,
    deleteReply,

    // toggleLike,
    // addComment,
    // toggleDisableLikes,
    // toggleDisableComments,
    // deletePost,
    // editPost,
    // followProfile,
    // unfollowProfile,
  } = usePostControl(postId, updateDocument);

  // when user clicks on comment icon set focus to comment textarea box
  const [focusOnComment, setFocusOnComment] = useState(false);
  // is current comment comment or reply on comment
  const [replayData, setReplayData] = useState(null);
  // is current profile user logged in
  const owner = userData.document.uid === postResponse.document?.uid;
  // remove focus from comment input filed on render
  useEffect(() => {
    if (focusOnComment) setFocusOnComment(false);
  }, [focusOnComment]);

  const handleAddComment = async text => {
    if (replayData) {
      addReplay({
        userName: userData.document.userName,
        avatarUrl: userData.document.avatar.url,
        text,
        commentIndex: replayData.commentIndex,
      });
      console.log(text, replayData);
    } else {
      await addComment({
        text: text,
        userName: userData.document.userName,
        avatarUrl: userData.document.avatar.url,
        replies: [],
      });
    }
    setFocusOnComment(false);
  };

  const handleReplyToComment = async data => {
    setReplayData(data);
    setFocusOnComment(true);
  };

  const handleCommentReset = () => {
    setReplayData(null);
    setFocusOnComment(true);
  };

  const handleDeleteComment = async commentIndex => {
    await deleteComment(commentIndex);
  };
  const handleDeleteReply = async (commentIndex, replayIndex) => {
    await deleteReply(commentIndex, replayIndex);
  };

  const handleToggleLike = async (userLikesPost, userName, userID) => {
    toggleLike(userLikesPost, userName, userID);
  };

  // control PostImage size to fit in parent container
  const imageContainerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(null);

  // control PostImage on response change
  useEffect(() => {
    if (imageContainerRef.current === null) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    setContainerSize(Math.min(rect.height, rect.width));
  }, [imageContainerRef, containerSize, postResponse]);

  // set window resize event if user changes screen size so PostImage is display correctly
  useEffect(() => {
    const watchSize = () => {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setContainerSize(Math.min(rect.height, rect.width));
    };
    window.addEventListener('resize', watchSize);
    return () => window.removeEventListener('resize', watchSize);
  }, []);

  if (!postResponse.document) return;

  return (
    <div className="overlay">
      <button onClick={() => navigate(-1)} className="btn btn--close">
        <img src={closeIcon} alt="close post" />
      </button>

      {postResponse.document && (
        <div className="Post">
          <div className="Post__image-wrapper" ref={imageContainerRef}>
            {/* wrapper is for keeping container in middle */}
            <div
              className="Post__image-container"
              style={{ width: containerSize, height: containerSize }}
            >
              {postResponse.document && (
                <PostImage
                  imagesData={postResponse.document.images}
                  dimensions={postResponse.document.dimensions}
                />
              )}
            </div>
          </div>

          <div className="Post__info">
            <PostHeader
              type="regular"
              owner={owner}
              postData={postResponse.document}
            />
            <PostCommentsList
              owner={owner}
              postData={postResponse.document}
              handleReply={handleReplyToComment}
              handleDeleteComment={handleDeleteComment}
              handleDeleteReply={handleDeleteReply}
            />
            <PostControls
              postData={postResponse.document}
              handleCommentReset={handleCommentReset}
              handleLikePost={toggleLike}
            />
            {!postResponse.document.disableComments && (
              <PostAddComment
                postData={postResponse.document}
                focusOnComment={focusOnComment}
                replyData={replayData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
