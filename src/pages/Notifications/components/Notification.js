import { formatTime } from '../../../utils/formatTime';
import { useNavigate } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
import LinkfyUsernames from '../../../components/LinkfyUsernames';
// styles
import './styles/Notification.css';

const Notification = ({ fromUser, post, data }) => {
  const navigate = useNavigate();

  return (
    <div className="Notification">
      <div className="Notification__content">
        <Avatar url={fromUser.avatar.url} size={30} />

        <p>
          <span
            className="Notification__content__username"
            onClick={() => navigate(`/${fromUser.userName}`)}
          >
            {fromUser.userName}
          </span>{' '}
          {data.content}{' '}
          {data.payload && <LinkfyUsernames text={data.payload} />}
          <span className="Notification__content__created-at">
            {` ${formatTime(data.createdAt.seconds * 1000)}`}
          </span>
        </p>
      </div>

      {post?.images && (
        <div
          className="Notification__post"
          onClick={() => navigate(`/p/${post.id}`)}
        >
          <PostImage
            //display only first img and hide navigation
            imagesData={[post.images[0]]}
            dimensions={post.dimensions}
          />
        </div>
      )}

      {data.content === 'started following you.' && (
        <button className="btn btn--auth">Follow</button>
      )}
    </div>
  );
};

export default Notification;
