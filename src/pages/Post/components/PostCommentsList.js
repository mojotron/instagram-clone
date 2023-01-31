// hooks
import { useMemo } from 'react';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';
import './styles/PostCommentsList.css';
// components
import PostComment from './PostComment';

const PostCommentsList = ({
  postData,
  handleReply,
  handleDeleteComment,
  handleDeleteReply,
}) => {
  // get all user who are listed in post doc (creator, comments and replies)
  const getUsersIdList = useMemo(() => {
    const result = { creator: postData.creator, comments: [], replies: [] };

    postData.comments.forEach(comment => {
      [...comment.replies].forEach(reply => result.replies.push(reply.userID));
      result.comments.push(comment.userID);
    });

    return [
      ...new Set([result.creator, ...result.comments, ...result.replies]),
    ];
  }, [postData]);

  const { documents } = useCollectDocsByIdList(getUsersIdList, 'users');

  if (documents === null) return;

  return (
    <div className="PostCommentsList">
      {/* first is post caption */}
      {postData.caption !== '' && (
        <PostComment
          userDocuments={documents}
          commentData={{
            userID: postData.userID,
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
            userDocuments={documents}
            commentData={comment}
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
