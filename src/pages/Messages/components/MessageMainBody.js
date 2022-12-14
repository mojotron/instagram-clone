import { useState, useEffect, useRef } from 'react';
import Avatar from '../../../components/Avatar';
import './styles/MessageMainBody.css';
import EmojiPicker from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi';
import { useMessages } from '../../../hooks/useMessages';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const MessageMainBody = ({ user }) => {
  const { response } = useUserDataContext();
  const { haveMessages, document, createMessageDoc, addMessage } =
    useMessages(user);

  console.log(haveMessages);

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
      if (haveMessages) {
        await addMessage('text', text);
      } else {
        await createMessageDoc(text);
      }
    } catch (error) {
      console.log(error);
    }

    // if is first message create
    // -- new message document
    // -- add message to that document
    // -- add doc Id of message doc to current user messages
    // -- add doc Id of message doc to target user messages
    // else
    // - append new message
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

        {document &&
          document.messages.map((msg, i) => {
            const ownMessage = msg.from === response.document.uid;

            return (
              <div
                className={`MessageMainBody__messages__item ${
                  ownMessage ? 'right' : 'left'
                }`}
                key={i}
              >
                {!ownMessage && <Avatar url={user.avatar.url} size="small" />}
                <p>{msg.text}</p>
              </div>
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
