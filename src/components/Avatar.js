import './styles/Avatar.css';
import defaultImg from '../images/default-avatar.png';

const Avatar = ({ url, size, handleClick }) => {
  // size of image in px (square)
  return (
    <div
      data-testid="avatar"
      className="Avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
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
