// hooks
import { useMemo } from 'react';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';
import './styles/PostCommentsList.css';
// components
import PostComment from './PostComment';

const PostCommentsList = ({
  owner,
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

  const { documents, isPending, error } = useCollectDocsByIdList(
    getUsersIdList,
    'users'
  );

  console.log('docs', documents);

  if (!documents) return;
  return (
    <div className="PostCommentsList">
      {/* first is post caption */}
      {postData.caption !== '' && (
        <PostComment
          owner={false}
          userData={documents.find(doc => doc.id === postData.creator)}
          postData={{
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
            userData={documents.find(doc => doc.id === comment.userID)}
            postData={comment}
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
