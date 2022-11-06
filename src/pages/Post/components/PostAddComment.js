import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './styles/PostAddComment.css';
import smileyIcon from '../../../images/smile-icon.svg';

const PostAddComment = ({ handleAddComment, focusOnComment, replayData }) => {
  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    if (replayData) {
      setText(`@${replayData.userName} `);
    } else {
      setText('');
    }
  }, [replayData]);

  useEffect(() => {
    if (focusOnComment) {
      textareaRef.current.focus();
    }
  }, [focusOnComment]);

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [text]);

  const handleEmojiClick = e => {
    const emoji = e.emoji;
    setText(oldValue => oldValue + emoji);
  };

  const handlePostComment = () => {
    handleAddComment(text);
    setText('');
  };
  return (
    <div className="PostAddComment">
      {showEmojis && (
        <div className="emoji--wrapper">
          <EmojiPicker emojiStyle="native" onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <button className="btn btn--emoji" onClick={() => setShowEmojis(true)}>
        <img src={smileyIcon} alt="open emoji picker" />
      </button>
      <textarea
        ref={textareaRef}
        onClick={() => setShowEmojis(false)}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a comment"
        style={{ minHeight: '25px', maxHeight: '80px', width: '350px' }}
      />
      <button
        className="btn btn--send-comment"
        disabled={text === ''}
        onClick={handlePostComment}
      >
        Send
      </button>
    </div>
  );
};

export default PostAddComment;
