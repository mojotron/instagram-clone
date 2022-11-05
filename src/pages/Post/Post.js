import { useLocation } from 'react-router-dom';
import { usePostControl } from '../../hooks/usePostControl';
import './styles/Post.css';
// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';
import PostAddComment from './components/PostAddComment';
import PostCommentsList from './components/PostCommentsList';
import { useState } from 'react';

const Post = () => {
  // data minimum data needed to get post document (postID, owner username and avatar url)
  const { state } = useLocation();
  // post document
  const { response, addComment, toggleLike } = usePostControl(state.postId);
  // when user clicks on comment icon set focus to comment textarea box
  const [focusOnComment, setFocusOnComment] = useState(false);

  const handleAddComment = async text => {
    await addComment({
      text: text,
      userName: state.userName,
      avatarUrl: state.avatar.url,
      replies: [],
    });
    setFocusOnComment(false);
  };

  const handleToggleLike = async (userLikesPost, userName, userID) => {
    toggleLike(userLikesPost, userName, userID);
  };

  return (
    <div className="overlay">
      {response.document && (
        <div className="Post">
          <div className="Post__image-wrapper">
            {/* wrapper is for keeping container in middle */}
            <div className="Post__image-container">
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
              avatarUrl={state.avatar.url}
              userName={state.userName}
            />
            <PostCommentsList
              postData={response.document}
              avatarUrl={state.avatar.url}
              userName={state.userName}
            />
            <PostControls
              likes={response.document.likes}
              handleToggleLike={handleToggleLike}
              setFocusOnComment={() => setFocusOnComment(true)}
              createdAt={response.document.createdAt.seconds}
            />
            <PostAddComment
              handleAddComment={handleAddComment}
              focusOnComment={focusOnComment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
