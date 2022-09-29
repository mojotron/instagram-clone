import './styles/Avatar.css';
import defaultImg from '../images/default-avatar.png';

const Avatar = ({ url, size, handleClick }) => {
  // size (small, mid, large) Avatar css classes
  return (
    <div
      data-testid="avatar"
      className={`Avatar Avatar--${size}`}
      onClick={handleClick}
    >
      <img
        className="Avatar__img"
        src={url || defaultImg}
        alt={url ? 'user avatar' : 'default avatar'}
      />
    </div>
  );
};

export default Avatar;
