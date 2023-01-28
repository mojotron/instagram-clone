// hooks
import { useCallback, useMemo } from 'react';
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
  console.log('mount List');
  console.log(postData);
  // get all user who are listed in post doc (creator, comments and replies)
  const getUsersIdList = useMemo(() => {
    console.log('getCommentsAndReplay run');
    const result = { creator: postData.creator, comments: [], replies: [] };

    postData.comments.forEach(comment => {
      [...comment.replies].forEach(reply => result.replies.push(reply.userID));
      result.comments.push(comment.userID);
    });

    return [result.creator, ...result.comments, ...result.replies];
  }, [postData]);
  console.log(getUsersIdList);

  const { documents, isPending, error } = useCollectDocsByIdList(
    getUsersIdList,
    'posts'
  );

  console.log(documents);

  // collect creator, comments, responses id
  // if (!documents) return;
  return (
    <div className="PostCommentsList">
      {/* first is post caption */}
      {/* {postData.caption !== '' && (
        <PostComment
          owner={false}
          data={{
            avatarUrl: postData.creator.avatarUrl,
            userName: postData.creator.userName,
            text: postData.caption,
            createdAt: postData.createdAt,
          }}
          commentIndex={null}
          handleReply={null}
        />
      )} */}
      {/* comments */}
      {/* {!postData.disableComments &&
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
        ))} */}
    </div>
  );
};

export default PostCommentsList;
