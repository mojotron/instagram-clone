import './styles/ImageButton.css';

const ImageButton = ({ icon, alt, handleClick, active, hidden }) => {
  return (
    <button
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
      className={`btn ImageButton ${active ? 'active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      <img src={icon} alt={alt} />
    </button>
  );
};

export default ImageButton;
