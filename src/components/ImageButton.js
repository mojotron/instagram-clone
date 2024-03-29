import './styles/ImageButton.css';

const ImageButton = ({ icon, handleClick, active, hidden }) => {
  return (
    <button
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
      className={`btn ImageButton ${active ? 'active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default ImageButton;
