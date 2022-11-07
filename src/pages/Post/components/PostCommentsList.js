import './styles/PostCommentsList.css';
import PostComment from './PostComment';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const PostCommentsList = ({ postData, avatarUrl, userName, handleReply }) => {
  const { response } = useUserDataContext();
  const owner = postData.uid === response.document.uid;

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
          />
        ))}
    </div>
  );
};

export default PostCommentsList;
