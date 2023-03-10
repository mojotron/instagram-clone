import './styles/LinkfyUsernames.css';
import { useNavigate } from 'react-router-dom';

const LinkfyUsernames = ({ text }) => {
  const navigate = useNavigate();

  let tempText = text;
  const usernames = [];
  const usernameRegex = /@[a-zA-Z0-9_-]+/g;
  tempText = text.replaceAll(usernameRegex, match => {
    usernames.push(match);
    return '<!USER_NAME!> ';
  });

  const result = tempText.split(' ').map((ele, i) => {
    if (ele === '<!USER_NAME!>') {
      const username = usernames.shift();
      return (
        <span
          key={i}
          className="btn btn--username-link"
          style={{ display: 'inline-block' }}
          onClick={() => navigate(`/${username.slice(1)}`)}
        >
          {username.trim(' ')}{' '}
        </span>
      );
    } else {
      return <span key={i}>{ele} </span>;
    }
  });

  return <>{result}</>;
};

export default LinkfyUsernames;
