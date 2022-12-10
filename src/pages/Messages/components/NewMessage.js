import './styles/NewMessage.css';
import { GrClose } from 'react-icons/gr';

const NewMessage = ({ setShowNewMessage }) => {
  return (
    <div className="overlay">
      <div className="NewMessage">
        <header className="NewMessage__header">
          <button className="btn" onClick={() => setShowNewMessage(false)}>
            <GrClose size={18} />
          </button>
          <h2>New message</h2>
          <button className="btn btn--blue">Next</button>
        </header>
      </div>
    </div>
  );
};

export default NewMessage;
