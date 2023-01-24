// components
import PostHeader from './components/PostHeader';
import PostImage from '../../components/PostImage';
import PostControls from './components/PostControls';
import PostAddComment from './components/PostAddComment';
import TimeLinePostCommentsList from './components/TimeLinePostCommentsList';
// styles
import './styles/TimeLinePost.css';
//hooks
import { useNavigate } from 'react-router-dom';

const TimeLinePost = ({ postData }) => {
  const navigate = useNavigate();

  return (
    <div className="TimeLinePost">
      <PostHeader type="timeline" postData={postData} />

      <div className="TimeLinePost__image-container">
        <PostImage
          imagesData={postData.images}
          dimensions={postData.dimensions}
        />
      </div>
      <PostControls
        postData={postData}
        // here is sending to user post not resetting comment
        // focus like in post component
        handleCommentReset={() => navigate(`/p/${postData.id}`)}
      />

      <TimeLinePostCommentsList postData={postData} />

      {!postData.disableComments && (
        <PostAddComment
          postData={postData}
          focusOnComment={null}
          replyData={null}
        />
      )}
    </div>
  );
};

export default TimeLinePost;
