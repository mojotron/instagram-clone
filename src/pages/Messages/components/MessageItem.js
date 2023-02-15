import './styles/MessageItem.css';
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useOnSnapshotDocument } from '../../../hooks/useOnSnapshotDocument';

const MessageItem = ({
  user,
  messageData,
  handleDeleteMessage,
  showOptions,
  setShowOptions,
}) => {
  const { response } = useUserDataContext();
  const navigate = useNavigate();
  const { document, isPending, error } = useOnSnapshotDocument(
    'posts',
    messageData.type === 'post-message' ? messageData.content : null
  );
  const ownMessage = response.document.uid === messageData.from;

  const handleShowOptions = index => {
    if (index === showOptions) setShowOptions(null);
    else setShowOptions(index);
  };

  return (
    <div className={`MessageItem ${ownMessage ? 'right' : 'left'}`}>
      <div className={`MessageItem__body ${ownMessage ? 'right' : 'left'}`}>
        <div className="MessageItem__body__control">
          {ownMessage && showOptions === messageData.messageIndex && (
            <div className="MessageItem__options">
              <button
                style={{
                  visibility:
                    showOptions === messageData.messageIndex && 'visible',
                  color: 'white',
                }}
                className="btn btn--unsend"
                onClick={() =>
                  handleDeleteMessage(user, messageData.messageIndex)
                }
              >
                Unsend
              </button>
            </div>
          )}
          {ownMessage && (
            <button
              type="button"
              className="btn"
              onClick={() => handleShowOptions(messageData.messageIndex)}
            >
              <BiDotsHorizontalRounded size={20} />
            </button>
          )}
        </div>

        {!ownMessage && <Avatar url={user.avatar.url} size={35} />}

        {messageData.type === 'text-message' && <p>{messageData.content}</p>}
        {messageData.type === 'post-message' && (
          <>
            {error && <p>Post load failed!</p>}
            {isPending && <p>Loading...</p>}
            {document && (
              <div
                style={{
                  width: '225px',
                  height: '400px',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/p/${messageData.content}`);
                }}
              >
                <PostImage
                  imagesData={[document.images[0]]}
                  dimensions={document.dimensions}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
