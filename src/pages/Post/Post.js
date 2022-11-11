import { useNavigate, useParams } from 'react-router-dom';
import { usePostControl } from '../../hooks/usePostControl';
import './styles/Post.css';
// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';
import PostAddComment from './components/PostAddComment';
import PostCommentsList from './components/PostCommentsList';
import { useState } from 'react';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useEffect } from 'react';
import { useRef } from 'react';
// icon
import closeIcon from '../../images/close-icon.svg';

const Post = () => {
  // type: regular, timeline
  const { response: userData } = useUserDataContext();
  // data minimum data needed to get post document (postID, owner username and avatar url)

  const { postId } = useParams();

  const navigate = useNavigate();

  // post document
  const {
    response,
    addComment,
    toggleLike,
    addReplay,
    deleteComment,
    deleteReply,
    toggleDisplayLikes,
    toggleDisplayComments,
    deletePost,
    editPost,
  } = usePostControl(postId);
  // when user clicks on comment icon set focus to comment textarea box
  const [focusOnComment, setFocusOnComment] = useState(false);
  //
  const [replayData, setReplayData] = useState(null);
  // TODO check at the end is owner only used inside PostCommentsList
  const owner = userData.document.uid === response.document?.uid;

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

  const editPostHandlers = {
    displayLikes: toggleDisplayLikes,
    disableComments: toggleDisplayComments,
    deletePost: deletePost,
    editPost: editPost,
  };

  const imageContainerRef = useRef();

  const [containerSize, setContainerSize] = useState(null);

  useEffect(() => {
    const watchSize = () => {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setContainerSize(Math.min(rect.height, rect.width));
    };
    window.addEventListener('resize', watchSize);

    return () => window.removeEventListener('resize', watchSize);
  }, []);

  if (!response.document) return;

  return (
    <div className="overlay">
      <button onClick={() => navigate(-1)} className="btn btn--close">
        <img src={closeIcon} alt="close post" />
      </button>

      {response.document && (
        <div className="Post">
          <div className="Post__image-wrapper" ref={imageContainerRef}>
            {/* wrapper is for keeping container in middle */}
            <div
              className="Post__image-container"
              style={{ width: containerSize, height: containerSize }}
            >
              {response.document && (
                <PostImage
                  imagesData={response.document.images}
                  dimensions={response.document.dimensions}
                />
              )}
            </div>
          </div>

          <div className="Post__info">
            <PostHeader
              owner={owner}
              postData={response.document}
              avatarUrl={response.document.creator.avatarUrl}
              userName={response.document.creator.userName}
              handlers={editPostHandlers}
              profileDocId={response.document.creator.profileDocId}
            />
            <PostCommentsList
              owner={owner}
              postData={response.document}
              avatarUrl={response.document.creator.avatarUrl}
              userName={response.document.creator.userName}
              handleReply={handleReplyToComment}
              handleDeleteComment={handleDeleteComment}
              handleDeleteReply={handleDeleteReply}
            />
            <PostControls
              owner={owner}
              postData={response.document}
              handleToggleLike={handleToggleLike}
              handleCommentReset={handleCommentReset}
              createdAt={response.document.createdAt.seconds}
            />
            {!response.document.disableComments && (
              <PostAddComment
                handleAddComment={handleAddComment}
                focusOnComment={focusOnComment}
                replayData={replayData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
