import './styles/MessageItem.css';
import Avatar from '../../../components/Avatar';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const MessageItem = ({
  user,
  messageData,
  ownMessage,
  handleDeleteMessage,
  messageIndex,
  showOptions,
  setShowOptions,
}) => {
  const handleShowOptions = index => {
    if (index === showOptions) setShowOptions(null);
    else setShowOptions(index);
  };

  return (
    <div className={`MessageItem ${ownMessage ? 'right' : 'left'}`}>
      <div className={`MessageItem__body ${ownMessage ? 'right' : 'left'}`}>
        <div className="MessageItem__body__control">
          {ownMessage && showOptions === messageIndex && (
            <div className="MessageItem__options">
              <button
                style={{
                  visibility: showOptions === messageIndex && 'visible',
                  color: 'white',
                }}
                className="btn btn--unsend"
                onClick={() => handleDeleteMessage(messageIndex)}
              >
                Unsend
              </button>
            </div>
          )}
          {ownMessage && (
            <button
              type="button"
              className="btn"
              onClick={() => handleShowOptions(messageIndex)}
            >
              <BiDotsHorizontalRounded size={20} />
            </button>
          )}
        </div>

        {!ownMessage && <Avatar url={user.avatar.url} size="small" />}
        <p>{messageData.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;
