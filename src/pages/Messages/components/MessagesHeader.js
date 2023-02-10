import { useUserDataContext } from '../../../hooks/useUserDataContext';
// styles
import './styles/MessagesHeader.css';
// icons
import { BiEdit } from 'react-icons/bi';

const MessagesHeader = ({ setShowNewMessage }) => {
  const { response } = useUserDataContext();

  return (
    <header className="MessagesHeader">
      <h2>{response.document.userName}</h2>

      <button className="btn" onClick={() => setShowNewMessage(true)}>
        <BiEdit size={25} />
      </button>
    </header>
  );
};

export default MessagesHeader;
