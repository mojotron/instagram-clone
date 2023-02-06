import { formatTime } from '../../../utils/formatTime';
// components
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
// styles
import './styles/Notification.css';

const Notification = ({ fromUser, post, data }) => {
  return (
    <div className="Notification">
      <div className="Notification__content">
        <Avatar url={fromUser.avatar.url} size={30} />
        <p>
          <span className="Notification__content__username">
            {fromUser.userName}
          </span>{' '}
          {data.content}{' '}
          <span className="Notification__content__created-at">
            {formatTime(data.createdAt.seconds * 1000)}
          </span>
        </p>
      </div>
      {post && (
        <div className="Notification__post">
          <PostImage imagesData={post.images} dimensions={post.dimensions} />
        </div>
      )}
      {data.content === 'started following you.' && (
        <button className="btn btn--auth">Follow</button>
      )}
    </div>
  );
};

export default Notification;
