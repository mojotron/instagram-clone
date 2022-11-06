import './styles/PostCommentsList.css';
import PostComment from './PostComment';
import { formatTime } from '../../../utils/formatTime';

const PostCommentsList = ({ postData, avatarUrl, userName, handleReply }) => {
  return (
    <div className="PostCommentsList">
      {/* first is post caption */}
      {postData.caption !== '' && (
        <PostComment
          data={{
            avatarUrl,
            userName,
            text: postData.caption,
            createdAt: postData.createdAt,
          }}
          commentIndex={null}
          handleReply={null}
        />
      )}
      {/* comments */}
      {!postData.disableComments &&
        postData.comments.map((comment, i) => (
          <PostComment
            key={i}
            data={comment}
            commentIndex={i}
            handleReply={handleReply}
          />
        ))}
    </div>
  );
};

export default PostCommentsList;
