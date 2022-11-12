// components
import PostImage from '../../components/PostImage';
import PostAddComment from './components/PostAddComment';
import PostControls from './components/PostControls';
import PostHeader from './components/PostHeader';
// styles
import './styles/TimeLinePost.css';

const TimeLinePost = ({ postData }) => {
  return (
    <div className="TimeLinePost">
      <PostHeader
        owner={false}
        postData={postData}
        handlers={{}}
        postDocId={postData.creator.profileDocId}
      />
      <div className="TimeLinePost__image-container">
        <PostImage
          imagesData={postData.images}
          dimensions={postData.dimensions}
        />
      </div>
      <PostControls
        postData={postData}
        handleToggleLike={() => {}}
        handleCommentReset={() => {}}
      />
      <PostAddComment />
    </div>
  );
};

export default TimeLinePost;
