import './styles/PostCommentsList.css';
import PostComment from './PostComment';

const PostCommentsList = ({
  owner,
  postData,
  avatarUrl,
  userName,
  handleReply,
  handleDeleteComment,
  handleDeleteReply,
}) => {
  return (
    <div className="PostCommentsList">
      {/* first is post caption */}
      {postData.caption !== '' && (
        <PostComment
          owner={false}
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
            owner={owner}
            data={comment}
            commentIndex={i}
            handleReply={handleReply}
            handleDeleteComment={handleDeleteComment}
            handleDeleteReply={handleDeleteReply}
          />
        ))}
    </div>
  );
};

export default PostCommentsList;
