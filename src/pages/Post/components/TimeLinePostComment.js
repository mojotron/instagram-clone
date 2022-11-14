import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/TimeLinePostComment.css';

const TimeLinePostComment = ({ data }) => {
  const navigate = useNavigate();

  const [hideText, setHideText] = useState(data.text.length > 100);

  console.log(hideText);

  return (
    <div className="TimeLineComment">
      <p>
        <span onClick={() => navigate(`/${data.userName}`)}>
          {data.userName}
        </span>{' '}
        {hideText ? `${data.text.slice(0, 100)}... ` : data.text}
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
