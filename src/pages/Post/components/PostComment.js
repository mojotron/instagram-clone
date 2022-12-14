import './styles/PostComment.css';
import Avatar from '../../../components/Avatar';
import { formatTime } from '../../../utils/formatTime';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moreOptions from '../../../images/more-horiz-icon.svg';
import ConfirmDelete from './ConfirmDelete';
import LinkfyUsernames from '../../../components/LinkfyUsernames';

const PostComment = ({
  owner,
  data,
  commentIndex,
  handleReply,
  handleDeleteComment,
  handleDeleteReply,
}) => {
  const navigate = useNavigate();

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
          url={data.avatarUrl}
          size="mid"
          handleClick={() => navigate(`/${data.userName}`)}
        />

        <div className="PostComment__main__inner">
          <p>
            <span
              className="PostComment__main__inner__username"
              onClick={() => navigate(`/${data.userName}`)}
            >
              {data.userName}{' '}
            </span>
            <LinkfyUsernames text={data.text} />
          </p>
          <div className="PostComment__controls">
            <p>{formatTime(data.createdAt.seconds * 1000)}</p>
            {handleReply && (
              <button
                className="btn btn--reply"
                onClick={() => handleReplyClick(data.avatarUrl, data.userName)}
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
                <img src={moreOptions} alt="options" />
              </button>
            )}
          </div>

          {data.replies?.length > 0 && (
            <div className="PostComment__replies">
              <button
                className="btn btn--toggle-replies"
                onClick={() => setShowReplies(oldValue => !oldValue)}
              >
                {showReplies
                  ? 'Hide replies'
                  : `View replies (${data.replies.length})`}
              </button>
              {showReplies && (
                <div>
                  {data.replies.map((reply, i) => (
                    <div key={i} className="PostComment__main replay">
                      <Avatar
                        url={reply.avatarUrl}
                        size="small"
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
                              <img src={moreOptions} alt="options" />
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
