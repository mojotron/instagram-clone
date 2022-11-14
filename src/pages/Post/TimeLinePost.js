// components
import PostImage from '../../components/PostImage';
import PostAddComment from './components/PostAddComment';
import PostControls from './components/PostControls';
import PostHeader from './components/PostHeader';
// styles
import './styles/TimeLinePost.css';
//hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';

import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';
import TimeLinePostCommentsList from './components/TimeLinePostCommentsList';
import { useNavigate } from 'react-router-dom';

const TimeLinePost = ({ postData }) => {
  const navigate = useNavigate();
  const { response } = useUserDataContext();
  const owner = postData.uid === response.document.uid;

  const toggleLikes = async () => {
    const userLikesPost = postData.likes.find(
      like => like.uid === response.document.uid
    );
    const oldLikes = [...postData.likes];

    let newLikes;
    if (!userLikesPost) {
      newLikes = [
        ...oldLikes,
        { userName: response.document.userName, uid: response.document.uid },
      ];
    } else {
      newLikes = oldLikes.filter(like => like.uid !== response.document.uid);
    }

    await updateDoc(doc(projectFirestore, 'posts', postData.id), {
      likes: newLikes,
    });
  };

  const handleAddComment = async text => {
    const newComment = {
      text: text,
      userName: response.document.userName,
      avatarUrl: response.document.avatar.url,
      replies: [],
      createdAt: Timestamp.fromDate(new Date()),
    };

    await updateDoc(doc(projectFirestore, 'posts', postData.id), {
      comments: [...postData.comments, newComment],
    });
  };

  return (
    <div className="TimeLinePost">
      <PostHeader
        type="timeline"
        owner={owner}
        postData={postData}
        handlers={{
          disableLikes: () => {},
          disableComments: () => {},
          deletePost: () => {},
          editPost: () => {},
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
        handleToggleLike={() => toggleLikes()}
        handleCommentReset={() => navigate(`/p/${postData.id}`)} // here is sending to user post not reseting comment focus like in post component
      />
      <TimeLinePostCommentsList postData={postData} />
      <PostAddComment
        handleAddComment={handleAddComment}
        focusOnComment={null}
        replyData={null}
      />
    </div>
  );
};

export default TimeLinePost;
