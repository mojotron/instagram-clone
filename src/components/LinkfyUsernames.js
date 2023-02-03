import './styles/LinkfyUsernames.css';
import { useNavigate } from 'react-router-dom';

const LinkfyUsernames = ({ text }) => {
  const navigate = useNavigate();

  let result = text;
  const usernames = [];
  const usernameRegex = /@[a-zA-Z0-9_-]+/g;
  result = text.replaceAll(usernameRegex, match => {
    usernames.push(match);
    return '<!USER_NAME!>';
  });

  const x = result.split(' ').map((ele, i) => {
    if (ele === '<!USER_NAME!>') {
      const username = usernames.shift();
      return (
        <span
          key={i}
          className="btn btn--username-link"
          style={{ display: 'inline-block' }}
          onClick={() => navigate(`/${username.slice(1)}`)}
        >
          {username}{' '}
        </span>
      );
    } else {
      return <span key={i}>{ele} </span>;
    }
  });

  return <>{x}</>;
};

export default LinkfyUsernames;
