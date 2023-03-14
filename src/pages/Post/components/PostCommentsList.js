// hooks
import { useMemo } from 'react';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';
import { useNavigate } from 'react-router-dom';
// styles
import './styles/PostCommentsList.css';
// components
import PostComment from './PostComment';
import Avatar from '../../../components/Avatar';
import LinkfyUsernames from '../../../components/LinkfyUsernames';
// utils
import { formatTime } from '../../../utils/formatTime';

const PostCommentsList = ({ postData, handleReply }) => {
  const navigate = useNavigate();
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

  const creatorDoc = useMemo(() => {
    return documents?.find(user => user.id === postData.creator);
  }, [documents, postData]);

  if (documents === null) return;

  return (
    <div className="PostCommentsList">
      {/* display caption */}
      {postData.caption !== '' && (
        <div className="PostComment__main">
          <Avatar
            url={creatorDoc.avatar.url}
            size={35}
            handleClick={() => {}}
          />

          <div className="PostComment__main__inner">
            <p>
              <span
                className="PostComment__main__inner__username"
                onClick={() => navigate(`/${creatorDoc.userName}`)}
              >
                {creatorDoc.userName}{' '}
              </span>
              <LinkfyUsernames text={postData.caption} />

              <span
                style={{
                  color: 'var(--gray)',
                  padding: '1rem 0 2rem',
                  display: 'block',
                }}
              >
                {formatTime(postData.createdAt.seconds * 1000)}
              </span>
            </p>
          </div>
        </div>
      )}
      {/* comments */}
      {!postData.disableComments &&
        postData.comments.map((comment, i) => (
          <PostComment
            key={i}
            userDocuments={documents}
            commentData={comment}
            postData={postData}
            commentIndex={i}
            handleReply={handleReply}
          />
        ))}
    </div>
  );
};

export default PostCommentsList;
