import { useLocation } from 'react-router-dom';
import { usePostControl } from '../../hooks/usePostControl';
import './styles/Post.css';
// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';
import PostAddComment from './components/PostAddComment';
import PostCommentsList from './components/PostCommentsList';

const Post = () => {
  const { state } = useLocation();
  const { response } = usePostControl(state.postId);

  return (
    <div className="overlay">
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
          <PostHeader avatarUrl={state.avatar.url} userName={state.userName} />
          <PostCommentsList />
          <PostControls />
          <PostAddComment />
        </div>
      </div>
    </div>
  );
};

export default Post;
