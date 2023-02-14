import './styles/MessageItem.css';
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useFirestore } from '../../../hooks/useFirestore';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MessageItem = ({
  user,
  messageData,
  ownMessage,
  handleDeleteMessage,
  messageIndex,
  showOptions,
  setShowOptions,
}) => {
  const { response, getDocumentById } = useFirestore('posts');
  const getPost = useRef(docId => getDocumentById(docId)).current;
  const navigate = useNavigate();

  useEffect(() => {
    if (messageData.type !== 'post-message') return;
    console.log('load data post');
    getPost(messageData.content);
  }, [getPost, messageData]);

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
                onClick={() => handleDeleteMessage(user, messageIndex)}
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

        {messageData.type === 'text' && <p>{messageData.content}</p>}
        {messageData.type === 'post' && (
          <>
            {response.error && <p>Post load failed!</p>}
            {response.isPending && <p>Loading...</p>}
            {response.document && (
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
                  imagesData={response.document.images}
                  dimensions={response.document.dimensions}
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
