import './styles/PostComment.css';
import Avatar from '../../../components/Avatar';

const PostComment = ({ avatarUrl, userName, text, createdAt }) => {
  return (
    <div className="PostComment">
      <div className="PostComment__main">
        <Avatar url={avatarUrl} size="mid" handleClick={() => {}} />

        <div className="PostComment__main__inner">
          <p>
            <span>{userName} </span>
            {text}
          </p>
          <p className="PostComment__created-at">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
