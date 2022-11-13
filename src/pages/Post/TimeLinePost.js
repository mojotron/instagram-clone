// components
import PostImage from '../../components/PostImage';
import PostAddComment from './components/PostAddComment';
import PostControls from './components/PostControls';
import PostHeader from './components/PostHeader';
// styles
import './styles/TimeLinePost.css';
//hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';

import { doc, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';

const TimeLinePost = ({ postData }) => {
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
    /// key
    console.log(newLikes);
    await updateDoc(doc(projectFirestore, 'posts', postData.id), {
      likes: newLikes,
    });
  };

  return (
    <div className="TimeLinePost">
      <PostHeader owner={owner} postData={postData} handlers={{}} />
      <div className="TimeLinePost__image-container">
        <PostImage
          imagesData={postData.images}
          dimensions={postData.dimensions}
        />
      </div>
      <PostControls
        postData={postData}
        handleToggleLike={() => toggleLikes()}
        handleCommentReset={() => {}}
      />
      <PostAddComment />
    </div>
  );
};

export default TimeLinePost;
