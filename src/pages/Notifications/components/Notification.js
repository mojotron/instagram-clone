import { formatTime } from '../../../utils/formatTime';
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../../../hooks/useFollow';
// components
import Avatar from '../../../components/Avatar';
import PostImage from '../../../components/PostImage';
import LinkfyUsernames from '../../../components/LinkfyUsernames';
// styles
import './styles/Notification.css';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';

const Notification = ({ fromUser, post, data }) => {
  const { response } = useUserDataContext();
  const { screenSize } = useScreenSizeContext();
  const navigate = useNavigate();
  const { follow } = useFollow();

  const handleFollowUser = async e => {
    e.preventDefault();
    await follow(fromUser.uid, fromUser.followers);
  };

  return (
    <div
      className="Notification"
      style={
        screenSize === 'small'
          ? { padding: '1rem 0.5rem' }
          : { padding: '1rem 2rem' }
      }
    >
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

      {data.content === 'started following you.' &&
        !response.document.following.includes(fromUser.uid) && (
          <button className="btn btn--auth" onClick={handleFollowUser}>
            Follow
          </button>
        )}
    </div>
  );
};

export default Notification;
