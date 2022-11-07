import './styles/PostComment.css';
import Avatar from '../../../components/Avatar';
import { formatTime } from '../../../utils/formatTime';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moreOptions from '../../../images/more-horiz-icon.svg';
import ConfirmDelete from './ConfirmDelete';

const CheckForAtLink = ({ text, navigate }) => {
  const test = /^@\w+\s/.test(text);
  if (!test) return text;

  const [hash, body] = text.split(/\s+(.*)/);
  return (
    <>
      <span
        style={{ color: '#265481', fontWeight: '400' }}
        onClick={() => navigate(`/${hash.slice(1)}`)}
      >
        {hash}{' '}
      </span>
      {body}
    </>
  );
};

const PostComment = ({ owner, data, commentIndex, handleReply }) => {
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

  const handleDeleteComment = () => {};
  const handleDeleteReply = () => {};

  return (
    <div className="PostComment">
      {showDeleteComment && (
        <ConfirmDelete handleClose={() => setShowDeleteComment(false)} />
      )}
      {showDeleteReply && (
        <ConfirmDelete handleClose={() => setShowDeleteReply(false)} />
      )}

      <div className="PostComment__main">
        <Avatar
          url={data.avatarUrl}
          size="mid"
          handleClick={() => navigate(`/${data.userName}`)}
        />

        <div className="PostComment__main__inner">
          <p>
            <span onClick={() => navigate(`/${data.userName}`)}>
              {data.userName}{' '}
            </span>
            {data.text}
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
                onClick={() => setShowDeleteComment(true)}
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
                          <CheckForAtLink
                            text={reply.text}
                            navigate={navigate}
                          />
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
                              onClick={() => setShowDeleteReply(true)}
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
