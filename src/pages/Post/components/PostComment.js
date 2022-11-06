import './styles/PostComment.css';
import Avatar from '../../../components/Avatar';
import { formatTime } from '../../../utils/formatTime';
import { useState } from 'react';

const PostComment = ({ data, commentIndex, handleReply }) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleReplyClick = (avatarUrl, userName) => {
    const replayData = {
      avatarUrl,
      userName,
      commentIndex,
    };
    handleReply(replayData);
  };
  console.log(data.replies);
  return (
    <div className="PostComment">
      <div className="PostComment__main">
        <Avatar url={data.avatarUrl} size="mid" handleClick={() => {}} />

        <div className="PostComment__main__inner">
          <p>
            <span>{data.userName} </span>
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
                      <Avatar url={reply.avatarUrl} size="small" />
                      <div className="PostComment__main__inner">
                        <p>
                          <span>{reply.userName} </span>
                          {reply.text}
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
