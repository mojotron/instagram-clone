// hooks
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { usePost } from '../../../hooks/usePost';
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
  userDocuments,
  commentData,
  postData,
  commentIndex,
  handleReply,
}) => {
  const { response } = useUserDataContext();
  const { deleteComment, deleteReplay } = usePost();
  const navigate = useNavigate();

  const [showReplies, setShowReplies] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [showDeleteReply, setShowDeleteReply] = useState(false);

  const [currentReplyIndex, setCurrentReplayIndex] = useState(null);

  const userData = useMemo(
    () => userDocuments.find(doc => doc.id === commentData.userID),
    [userDocuments, commentData]
  );

  const owner = response.document.id === commentData.userID;

  const handleReplyClick = (replyToUsername, replyToID) => {
    handleReply({
      replyToUsername, // whom we answer to
      replyToID,
      userID: response.document.id,
      commentIndex,
    });
  };

  const resetCurrentIndices = () => {
    setCurrentReplayIndex(null);
    setShowDeleteComment(false);
    setShowDeleteReply(false);
  };

  const handleDeleteCommentClick = async () => {
    await deleteComment(postData.comments, commentIndex, postData.id);
    resetCurrentIndices();
    setShowDeleteComment(false);
    handleReply(null);
  };
  const handleDeleteReplyClick = async () => {
    await deleteReplay(
      postData.comments,
      commentIndex,
      currentReplyIndex,
      postData.id
    );
    resetCurrentIndices();
    handleReply(null);
  };

  if (!userData) return;

  return (
    <div className="PostComment">
      {showDeleteComment && (
        <ConfirmDelete
          btnText="Delete Comment"
          handleClose={() => setShowDeleteComment(false)}
          handleDelete={handleDeleteCommentClick}
        />
      )}
      {showDeleteReply && (
        <ConfirmDelete
          btnText="Delete Reply"
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
                  handleReplyClick(userData.userName, commentData.userID)
                }
              >
                Reply
              </button>
            )}

            {owner && (
              <button
                className="btn btn--options"
                onClick={() => {
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
                  {commentData.replies.map((reply, i) => {
                    // get document of user
                    const replyDoc = userDocuments.find(
                      doc => doc.id === reply.userID
                    );

                    return (
                      <div key={i} className="PostComment__main replay">
                        <Avatar
                          url={replyDoc.avatar.url}
                          size={22}
                          handleClick={() => navigate(`/${replyDoc.userName}`)}
                        />
                        <div className="PostComment__main__inner">
                          <p>
                            <span
                              className="PostComment__main__inner__username"
                              onClick={() => navigate(`/${replyDoc.userName}`)}
                            >
                              {replyDoc.userName}{' '}
                            </span>
                            <LinkfyUsernames text={reply.text} />
                          </p>
                          <div className="PostComment__controls">
                            <p>{formatTime(reply.createdAt.seconds * 1000)}</p>

                            <button
                              className="btn btn--reply"
                              onClick={() =>
                                handleReplyClick(replyDoc.userName, replyDoc.id)
                              }
                            >
                              Reply
                            </button>

                            {owner && (
                              <button
                                className="btn btn--options"
                                onClick={() => {
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
                    );
                  })}
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
