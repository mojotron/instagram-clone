// hooks
import { useState } from 'react';
// icons
import { AiOutlineInfoCircle } from 'react-icons/ai';
// styles
import './styles/InfoPopUpBox.css';

const InfoPopUpBox = ({ title, message }) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="InfoPopUpBox">
      {showMessage && (
        <div className="InfoPopUpBox__message">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
      )}
      <button
        className="btn"
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      >
        <AiOutlineInfoCircle size={20} color="var(--gray)" />
      </button>
    </div>
  );
};

export default InfoPopUpBox;
