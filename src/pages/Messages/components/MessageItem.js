import { useState } from 'react';
import './styles/MessageItem.css';
import Avatar from '../../../components/Avatar';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const MessageItem = ({
  user,
  messageData,
  ownMessage,
  handleDeleteMessage,
  messageIndex,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(oldValue => !oldValue);
  };
  return (
    <div className={`MessageItem ${ownMessage ? 'right' : 'left'}`}>
      <div className="MessageItem__body">
        <div className="MessageItem__body__control">
          {ownMessage && showOptions && (
            <div className="MessageItem__options"></div>
          )}
          {ownMessage && (
            <button type="button" className="btn" onClick={toggleShowOptions}>
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
