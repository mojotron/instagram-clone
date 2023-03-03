import './styles/SwitchUserPopup.css';
import { GrClose } from 'react-icons/gr';
import { useLogout } from '../../../hooks/useLogout';
import WelcomeMessage from './WelcomeMessage';

const SwitchUserPopup = ({ handleClose }) => {
  const { isPending, error, logout } = useLogout();
  return (
    <div className="overlay">
      <button type="button" className="btn btn--close" onClick={handleClose}>
        <GrClose size={20} />
      </button>

      <div className="SwitchUserPopup">
        <WelcomeMessage headingText="Instagram Clone" />
        <h3>Logout from this account</h3>
        {error && <p className="error">{error}</p>}
        <button className="btn btn--auth" onClick={logout}>
          {isPending ? 'Loading...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default SwitchUserPopup;
