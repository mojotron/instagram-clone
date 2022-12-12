import { useState, useEffect, useRef } from 'react';
import Avatar from '../../../components/Avatar';
import './styles/MessageMainBody.css';
import EmojiPicker from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi';

const MessageMainBody = ({ user }) => {
  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef();

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [text]);

  return (
    <section className="MessageMainBody">
      <header className="MessageMainBody__header">
        <Avatar url={user.avatar.url} size="small" />
        <h2>{user.userName}</h2>
      </header>

      <main className="MessageMainBody__messages"></main>

      <footer className="MessageMainBody__new-message">
        <form className="MessageMainBody__new-message__form">
          {showEmojis && <EmojiPicker />}
          <button className="btn btn--direct-emoji" onClick={() => {}}>
            <BiSmile size={25} />
          </button>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Message..."
            autoCorrect="off"
          />
        </form>
      </footer>
    </section>
  );
};

export default MessageMainBody;
