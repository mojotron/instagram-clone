// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// style
import './styles/PostComment.css';
// components
import Avatar from '../../../components/Avatar';
import ConfirmDelete from './ConfirmDelete';
import LinkfyUsernames from '../../../components/LinkfyUsernames';
// utils
import { formatTime } from '../../../utils/formatTime';
// icons
import { FiMoreHorizontal } from 'react-icons/fi';

const PostComment = ({
  userData,
  commentData,
  commentIndex,
  handleReply,
  handleDeleteComment,
  handleDeleteReply,
}) => {
  const { response } = useUserDataContext();
  const navigate = useNavigate();
  // const owner = response.document.id === postData.comments[commentIndex].userID;
  const owner = response.document.id === commentData.userID;
  const [showReplies, setShowReplies] = useState(false);

  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [showDeleteReply, setShowDeleteReply] = useState(false);

  const handleReplyClick = (avatarUrl, userName) => {
    const replayData = {
      avatarUrl,
      userName,
      commentIndex,
    };
    handleReply(replayData);
  };

  const [currentCommentIndex, setCurrentCommentIndex] = useState(null);
  const [currentReplyIndex, setCurrentReplayIndex] = useState(null);

  const resetCurrentIndices = () => {
    setCurrentCommentIndex(null);
    setCurrentReplayIndex(null);
    setShowDeleteComment(false);
    setShowDeleteReply(false);
  };

  const handleDeleteCommentClick = async () => {
    await handleDeleteComment(currentCommentIndex);
    resetCurrentIndices();
    setShowDeleteComment(false);
  };
  const handleDeleteReplyClick = async () => {
    await handleDeleteReply(currentCommentIndex, currentReplyIndex);
    resetCurrentIndices();
  };

  return (
    <div className="PostComment">
      {showDeleteComment && (
        <ConfirmDelete
          handleClose={() => setShowDeleteComment(false)}
          handleDelete={handleDeleteCommentClick}
        />
      )}
      {showDeleteReply && (
        <ConfirmDelete
          handleClose={() => setShowDeleteReply(false)}
          handleDelete={handleDeleteReplyClick}
        />
      )}

      <div className="PostComment__main">
        <Avatar
          url={userData.avatar.url}
          size={35}
          handleClick={() => navigate(`/${userData.userName}`)}
        />

        <div className="PostComment__main__inner">
          <p>
            <span
              className="PostComment__main__inner__username"
              onClick={() => navigate(`/${userData.userName}`)}
            >
              {userData.userName}{' '}
            </span>
            <LinkfyUsernames text={commentData.text} />
          </p>
          <div className="PostComment__controls">
            <p>{formatTime(commentData.createdAt.seconds * 1000)}</p>
            {handleReply && (
              <button
                className="btn btn--reply"
                onClick={() =>
                  handleReplyClick(userData.avatar.Url, userData.userName)
                }
              >
                Reply
              </button>
            )}
            {owner && (
              <button
                className="btn btn--options"
                onClick={() => {
                  setCurrentCommentIndex(commentIndex);
                  setShowDeleteComment(true);
                }}
              >
                <FiMoreHorizontal size={20} />
              </button>
            )}
          </div>

          {commentData.replies?.length > 0 && (
            <div className="PostComment__replies">
              <button
                className="btn btn--toggle-replies"
                onClick={() => setShowReplies(oldValue => !oldValue)}
              >
                {showReplies
                  ? 'Hide replies'
                  : `View replies (${commentData.replies.length})`}
              </button>
              {showReplies && (
                <div>
                  {commentData.replies.map((reply, i) => (
                    <div key={i} className="PostComment__main replay">
                      <Avatar
                        url={reply.avatarUrl}
                        size={22}
                        handleClick={() => navigate(`/${reply.userName}`)}
                      />
                      <div className="PostComment__main__inner">
                        <p>
                          <span onClick={() => navigate(`/${reply.userName}`)}>
                            {reply.userName}{' '}
                          </span>
                          <LinkfyUsernames text={reply.text} />
                        </p>
                        <div className="PostComment__controls">
                          <p>{formatTime(reply.createdAt.seconds * 1000)}</p>
                          {handleReply && (
                            <button
                              className="btn btn--reply"
                              onClick={() =>
                                handleReplyClick(
                                  reply.avatarUrl,
                                  reply.userName
                                )
                              }
                            >
                              Reply
                            </button>
                          )}
                          {owner && (
                            <button
                              className="btn btn--options"
                              onClick={() => {
                                setCurrentCommentIndex(commentIndex);
                                setCurrentReplayIndex(i);
                                setShowDeleteReply(true);
                              }}
                            >
                              <FiMoreHorizontal size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
