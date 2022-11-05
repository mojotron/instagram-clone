import './styles/PostCommentsList.css';
import PostComment from './PostComment';
import { formatTime } from '../../../utils/formatTime';

const PostCommentsList = ({ postData, avatarUrl, userName }) => {
  return (
    <div className="PostCommentsList">
      {/* first is post caption */}
      {postData.caption !== '' && (
        <PostComment
          avatarUrl={avatarUrl}
          userName={userName}
          text={postData.caption}
          createdAt={formatTime(postData.createdAt.seconds * 1000)}
        />
      )}
      {/* comments */}
      {!postData.disableComments &&
        postData.comments.map((comment, i) => (
          <PostComment
            key={i}
            avatarUrl={comment.avatarUrl}
            userName={comment.userName}
            text={comment.text}
            createdAt={formatTime(comment.createdAt.seconds * 1000)}
          />
        ))}
    </div>
  );
};

export default PostCommentsList;
