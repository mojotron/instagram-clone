// hooks
import { useState, useRef, useEffect } from 'react';
import { usePost } from '../../../hooks/usePost';
// components
import EmojiPicker from 'emoji-picker-react';
// styles
import './styles/PostAddComment.css';
// icon
import { MdSentimentSatisfiedAlt } from 'react-icons/md';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const PostAddComment = ({
  postData,
  focusOnComment,
  replyData,
  setReplayData,
}) => {
  const { response } = useUserDataContext();
  const { addComment, addReplyToComment } = usePost();
  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    if (replyData) {
      setText(`@${replyData.replyToUsername} `);
    } else {
      setText('');
    }
  }, [replyData]);

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

  const handlePostComment = async () => {
    if (replyData) {
      // add replay
      await addReplyToComment(
        text,
        postData.comments,
        replyData.commentIndex,
        postData.id,
        response.document.id
      );
      setReplayData(null);
    } else {
      await addComment(text, postData.comments, postData.id, postData.creator);
      setText('');
    }
  };

  return (
    <div className="PostAddComment">
      {showEmojis && (
        <div className="emoji--wrapper">
          <EmojiPicker emojiStyle="native" onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <button className="btn btn--emoji" onClick={() => setShowEmojis(true)}>
        <MdSentimentSatisfiedAlt size={25} color="var(--gray)" />
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
