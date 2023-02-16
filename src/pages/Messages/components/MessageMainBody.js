// hooks
import { useState, useEffect, useRef, useMemo } from 'react';
import { useMessages } from '../../../hooks/useMessages';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
// style
import './styles/MessageMainBody.css';
// icons
import { BiSmile } from 'react-icons/bi';
// components
import Avatar from '../../../components/Avatar';
import EmojiPicker from 'emoji-picker-react';
import MessageItem from './MessageItem';
import { useOnSnapshotDocument } from '../../../hooks/useOnSnapshotDocument';

const MessageMainBody = ({ messageTo }) => {
  const { response } = useUserDataContext();
  const { addMessage, deleteMessage } = useMessages();

  const findMessages = useMemo(() => {
    return response.document.messages.find(msg => msg.messageTo === messageTo);
  }, [response.document.messages, messageTo]);

  const { document: messageToUserDoc } = useOnSnapshotDocument(
    'users',
    messageTo
  );

  const { document: messagesDoc } = useOnSnapshotDocument(
    'messages',
    findMessages?.messageDocId
  );

  // for message options popup with index
  const [showOptions, setShowOptions] = useState(null);

  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef();

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [text]);

  const handleEmojiClick = e => {
    const emoji = e.emoji;
    setText(oldValue => oldValue + emoji);
  };

  const toggleEmojis = () => {
    setShowEmojis(oldValue => !oldValue);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addMessage(messagesDoc, messageToUserDoc, 'text-message', text);
    } catch (error) {
      console.log(error);
    }
    setText('');
    setShowEmojis(false);
  };

  if (!messageToUserDoc) return null;

  return (
    <section className="MessageMainBody">
      <header className="MessageMainBody__header">
        <Avatar url={messageToUserDoc.avatar.url} size={35} />
        <h2>{messageToUserDoc.userName}</h2>
      </header>

      <main className="MessageMainBody__messages">
        {showEmojis && (
          <div className="MessageMainBody__messages__emojis">
            <EmojiPicker emojiStyle="native" onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {/* display messages */}
        {/* {isPending && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
        {messagesDoc &&
          messagesDoc.messages.map((msg, i) => {
            return (
              <MessageItem
                key={msg.createdAt.seconds}
                user={messageToUserDoc}
                messageData={{ ...msg, messageIndex: i }}
                handleDeleteMessage={deleteMessage}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
              />
            );
          })}
      </main>

      <footer className="MessageMainBody__new-message">
        <form
          className="MessageMainBody__new-message__form"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="btn btn--direct-emoji"
            onClick={toggleEmojis}
          >
            <BiSmile size={25} />
          </button>

          <textarea
            ref={textareaRef}
            value={text}
            onClick={() => setShowEmojis(false)}
            onChange={e => setText(e.target.value)}
            placeholder="Message..."
            autoCorrect="off"
            maxLength="2200"
          />

          <button className="btn btn--blue btn--direct">Send</button>
        </form>
      </footer>
    </section>
  );
};

export default MessageMainBody;
