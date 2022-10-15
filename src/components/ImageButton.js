import './styles/ImageButton.css';

const ImageButton = ({ icon, alt, active, handleClick }) => {
  return (
    <button
      className={`btn ImageButton ${active ? 'active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      <img src={icon} alt={alt} />
    </button>
  );
};

export default ImageButton;
