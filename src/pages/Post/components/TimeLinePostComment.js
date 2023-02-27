import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkfyUsernames from '../../../components/LinkfyUsernames';
import './styles/TimeLinePostComment.css';

const TimeLinePostComment = ({ text, userName }) => {
  const navigate = useNavigate();

  const [hideText, setHideText] = useState(text.length > 100);

  return (
    <div className="TimeLineComment">
      <p>
        <span
          className="TimeLineComment__username"
          onClick={() => navigate(`/${userName}`)}
        >
          {userName}
        </span>{' '}
        {hideText && <LinkfyUsernames text={text.slice(0, 100)} />}
        {!hideText && <LinkfyUsernames text={text} />}
        {hideText ? (
          <button
            className="btn btn--show-text"
            onClick={() => setHideText(false)}
          >
            more
          </button>
        ) : (
          ''
        )}
      </p>
    </div>
  );
};

export default TimeLinePostComment;
