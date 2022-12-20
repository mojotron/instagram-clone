import { useState, useEffect, useRef } from 'react';
// style
import './styles/MessageMainBody.css';
// icons
import { BiSmile } from 'react-icons/bi';
// components
import Avatar from '../../../components/Avatar';
import EmojiPicker from 'emoji-picker-react';
import MessageItem from './MessageItem';
// hooks
import { useMessages } from '../../../hooks/useMessages';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useCollectMessage } from '../../../hooks/useCollectMessage';

const MessageMainBody = ({ user }) => {
  const { response } = useUserDataContext();
  const { document, isPending, error } = useCollectMessage(user);
  const { addMessage, deleteMessage } = useMessages();
  // for message options popup with index
  const [showOptions, setShowOptions] = useState(null);

  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef();

  useEffect(() => {
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
      await addMessage(user, 'text', text);
    } catch (error) {
      console.log(error);
    }
    setText('');
    setShowEmojis(false);
  };

  return (
    <section className="MessageMainBody">
      <header className="MessageMainBody__header">
        <Avatar url={user.avatar.url} size="small" />
        <h2>{user.userName}</h2>
      </header>

      <main className="MessageMainBody__messages">
        {showEmojis && (
          <div className="MessageMainBody__messages__emojis">
            <EmojiPicker emojiStyle="native" onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {/* display messages */}
        {isPending && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {document &&
          document.messages.map((msg, i) => {
            const ownMessage = msg.from === response.document.uid;
            return (
              <MessageItem
                user={user}
                messageData={msg}
                ownMessage={ownMessage}
                handleDeleteMessage={deleteMessage}
                messageIndex={i}
                key={i}
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
