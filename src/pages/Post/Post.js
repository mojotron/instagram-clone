// hooks
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
// styles
import './styles/Post.css';
// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';
import PostAddComment from './components/PostAddComment';
import PostCommentsList from './components/PostCommentsList';
// icon
import { GrClose } from 'react-icons/gr';

const Post = () => {
  const navigate = useNavigate();
  // data minimum data needed to get post document (postID, owner username and avatar url)
  const { postId } = useParams();
  const { document: postDocument } = useOnSnapshotDocument('posts', postId);
  // when user clicks on comment icon set focus to comment textarea box
  const [focusOnComment, setFocusOnComment] = useState(false);
  // is current comment comment or reply on comment
  // replay has format null or {replayToUsername, replayToID, userID, commentIndex}
  const [replyData, setReplayData] = useState(null);

  console.log(replyData);

  useEffect(() => {
    // remove focus from comment input filed on render
    if (focusOnComment) setFocusOnComment(false);
  }, [focusOnComment]);

  const handleReplyToComment = async data => {
    setReplayData(data);
    setFocusOnComment(true);
  };

  const handleCommentReset = () => {
    setReplayData(null);
    setFocusOnComment(true);
  };

  // control PostImage size to fit in parent container
  const imageContainerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(null);

  // control PostImage on response change
  useEffect(() => {
    if (imageContainerRef.current === null) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    setContainerSize(Math.min(rect.height, rect.width));
  }, [imageContainerRef, containerSize, postDocument]);

  // set window resize event if user changes screen size so PostImage is display correctly
  useEffect(() => {
    const watchSize = () => {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setContainerSize(Math.min(rect.height, rect.width));
    };
    window.addEventListener('resize', watchSize);
    return () => window.removeEventListener('resize', watchSize);
  }, []);

  if (!postDocument) return;

  return (
    <div className="overlay">
      <button onClick={() => navigate(-1)} className="btn btn--close">
        <GrClose size={25} />
      </button>

      {postDocument && (
        <div className="Post">
          <div className="Post__image-wrapper" ref={imageContainerRef}>
            {/* wrapper is for keeping container in middle */}
            <div
              className="Post__image-container"
              style={{ width: containerSize, height: containerSize }}
            >
              {postDocument && (
                <PostImage
                  imagesData={postDocument.images}
                  dimensions={postDocument.dimensions}
                />
              )}
            </div>
          </div>

          <div className="Post__info">
            {/* post type: regular, timeline */}
            <PostHeader type="regular" postData={postDocument} />

            <PostCommentsList
              postData={postDocument}
              handleReply={handleReplyToComment}
            />

            <PostControls
              postData={postDocument}
              handleCommentReset={handleCommentReset}
            />

            {!postDocument.disableComments && (
              <PostAddComment
                postData={postDocument}
                focusOnComment={focusOnComment}
                replyData={replyData}
                setReplayData={setReplayData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
