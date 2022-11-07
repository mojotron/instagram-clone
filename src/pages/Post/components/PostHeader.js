import './styles/PostHeader.css';
import Avatar from '../../../components/Avatar';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ avatarUrl, userName }) => {
  const navigate = useNavigate();

  return (
    <header className="PostHeader">
      <Avatar
        url={avatarUrl}
        size="mid"
        handleClick={() => navigate(`/${userName}`)}
      />
      <h2 onClick={() => navigate(`/${userName}`)}>{userName}</h2>
    </header>
  );
};

export default PostHeader;
