import { useLocation } from 'react-router-dom';
import { usePostControl } from '../../hooks/usePostControl';
import './styles/Post.css';
// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';

const Post = () => {
  const { state } = useLocation();

  const { response } = usePostControl(state.postId);
  console.log(response.document);
  return (
    <div className="overlay">
      <div className="Post">
        <div className="Post__image-container">
          {response.document && (
            <PostImage
              imagesData={response.document.images}
              dimensions={response.document.dimensions}
            />
          )}
        </div>

        <div className="Post__info">
          <PostHeader avatarUrl={state.avatar.url} userName={state.userName} />
          <PostControls />
        </div>
      </div>
    </div>
  );
};

export default Post;
