// components
import PostImage from '../../components/PostImage';
import PostAddComment from './components/PostAddComment';
import PostControls from './components/PostControls';
import PostHeader from './components/PostHeader';
import TimeLinePostCommentsList from './components/TimeLinePostCommentsList';
// styles
import './styles/TimeLinePost.css';
//hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useNavigate } from 'react-router-dom';
import { useTimeLinePostHandlers } from '../../hooks/useTimeLinePostHandlers';

const TimeLinePost = ({ postData }) => {
  const navigate = useNavigate();
  const { response } = useUserDataContext();

  const {
    toggleLike,
    addComment,
    toggleDisableLikes,
    toggleDisableComments,
    deletePost,
    editPost,
    followProfile,
    unfollowProfile,
  } = useTimeLinePostHandlers();

  const owner = postData.uid === response.document.uid;

  return (
    <div className="TimeLinePost">
      <PostHeader
        type="timeline"
        owner={owner}
        postData={postData}
        handlers={{
          toggleDisableLikes,
          toggleDisableComments,
          deletePost,
          editPost,
          followProfile,
          unfollowProfile,
        }}
      />
      <div className="TimeLinePost__image-container">
        <PostImage
          imagesData={postData.images}
          dimensions={postData.dimensions}
        />
      </div>
      <PostControls
        postData={postData}
        handleCommentReset={() => navigate(`/p/${postData.id}`)} // here is sending to user post not reseting comment focus like in post component
        handleLikePost={toggleLike}
      />
      <TimeLinePostCommentsList postData={postData} />
      {!postData.disableComments && (
        <PostAddComment
          postData={postData}
          handleAddComment={addComment}
          focusOnComment={null}
          replyData={null}
        />
      )}
    </div>
  );
};

export default TimeLinePost;
