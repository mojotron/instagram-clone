import './styles/CreatePostHeader.css';
// icons
import backspaceIcon from '../../../images/backspace-icon.svg';

const CreatePostHeader = ({ title, btnText, handleNext }) => {
  return (
    <header className="CreatePostHeader">
      <button className="btn CreatePostHeader__back-button">
        <img src={backspaceIcon} alt="go back" />
      </button>

      <h2>{title}</h2>

      <button
        onClick={handleNext}
        className="btn CreatePostHeader__next-button"
      >
        {btnText}
      </button>
    </header>
  );
};

export default CreatePostHeader;
