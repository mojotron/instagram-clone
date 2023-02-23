// hooks
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { useScreenSizeContext } from '../../hooks/useScreenSizeContext';
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
  const { screenSize } = useScreenSizeContext();
  // data minimum data needed to get post document (postID, owner username and avatar url)
  const { postId } = useParams();
  const { document: postDocument } = useOnSnapshotDocument('posts', postId);
  // when user clicks on comment icon set focus to comment textarea box
  const [focusOnComment, setFocusOnComment] = useState(false);
  // is current comment comment or reply on comment
  // replay has format null or {replyToUsername, replyToID, userID, commentIndex}
  const [replyData, setReplayData] = useState(null);

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
  // stop memory leak when resizing screen many times
  const [initialSizeSet, setInitialSizeSet] = useState(null);

  // control PostImage on response change
  useEffect(() => {
    let isMounted = true;
    if (initialSizeSet) return;
    if (imageContainerRef.current === null) return;

    const rect = imageContainerRef.current.getBoundingClientRect();

    if (isMounted) {
      setContainerSize(Math.min(rect.height, rect.width));
    }

    return () => (isMounted = false);
  }, [imageContainerRef, containerSize, postDocument, initialSizeSet]);

  // set window resize event if user changes screen size so PostImage is display correctly
  useEffect(() => {
    let isMounted = true;
    const watchSize = () => {
      const rect = imageContainerRef.current.getBoundingClientRect();
      if (isMounted) {
        setContainerSize(Math.min(rect.height, rect.width));
        setInitialSizeSet(true);
      }
    };
    window.addEventListener('resize', watchSize);
    return () => {
      isMounted = false;
      window.removeEventListener('resize', watchSize);
    };
  }, []);

  if (!postDocument) return;

  return (
    <div className="overlay">
      <button onClick={() => navigate(-1)} className="btn btn--close">
        <GrClose size={25} />
      </button>

      {postDocument && (
        <div
          className="Post"
          style={
            screenSize === 'small'
              ? {
                  flexDirection: 'column',
                  width: '335px',
                  height: '100vh',
                  maxHeight: '95vh',
                  overflowY: 'scroll',
                }
              : {
                  flexDirection: 'row',
                }
          }
        >
          {screenSize === 'small' && (
            <PostHeader type="regular" postData={postDocument} />
          )}

          <div
            className="Post__image-wrapper"
            ref={imageContainerRef}
            style={
              screenSize === 'small'
                ? { flexGrow: '0', flexShrink: '0' }
                : { flexGrow: '2', flexShrink: '2' }
            }
          >
            {/* wrapper is for keeping container in middle */}
            <div
              className="Post__image-container"
              style={
                screenSize === 'small'
                  ? { width: '335px', height: '335px', marginBottom: '20px' }
                  : {
                      width: containerSize,
                      height: containerSize,
                    }
              }
            >
              {postDocument && (
                <PostImage
                  imagesData={postDocument.images}
                  dimensions={postDocument.dimensions}
                />
              )}
            </div>
          </div>

          <div
            className="Post__info"
            style={
              screenSize === 'small'
                ? { width: '335px' }
                : { width: '500px', flexGrow: '1', flexShrink: '1' }
            }
          >
            {/* post type: regular, timeline */}
            {screenSize !== 'small' && (
              <PostHeader type="regular" postData={postDocument} />
            )}

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
