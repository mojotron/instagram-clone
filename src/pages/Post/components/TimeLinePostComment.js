import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkfyUsernames from '../../../components/LinkfyUsernames';
import './styles/TimeLinePostComment.css';

const TimeLinePostComment = ({ data }) => {
  const navigate = useNavigate();

  const [hideText, setHideText] = useState(data.text.length > 100);

  return (
    <div className="TimeLineComment">
      <p>
        <span
          className="TimeLineComment__username"
          onClick={() => navigate(`/${data.userName}`)}
        >
          {data.userName}
        </span>{' '}
        {hideText && <LinkfyUsernames text={data.text.slice(0, 100)} />}
        {!hideText && <LinkfyUsernames text={data.text} />}
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
