import './styles/CreatePostHeader.css';
// icons
import { MdKeyboardBackspace } from 'react-icons/md';

const CreatePostHeader = ({ title, btnText, handleNext, handlePrev }) => {
  // if handler is null hide button
  return (
    <header className="CreatePostHeader">
      <button
        style={{ visibility: handlePrev === null ? 'hidden' : 'visible' }}
        className="btn CreatePostHeader__back-button"
        onClick={handlePrev}
      >
        <MdKeyboardBackspace size={25} />
      </button>

      <h2>{title}</h2>

      <button
        style={{ visibility: handleNext === null ? 'hidden' : 'visible' }}
        onClick={handleNext}
        className="btn CreatePostHeader__next-button"
      >
        {btnText || 'next'}
      </button>
    </header>
  );
};

export default CreatePostHeader;
