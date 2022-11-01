import './styles/ProfileDropdown.css';
import { Link } from 'react-router-dom';
// icons
import userIcon from '../../../images/user-icon.svg';
import settingsIcon from '../../../images/settings-icon.svg';
import bookmarkIcon from '../../../images/bookmark-icon.svg';
import { useLogout } from '../../../hooks/useLogout';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const ProfileDropdown = () => {
  const { response } = useUserDataContext();
  const { isPending, error, logout } = useLogout();
  return (
    <ul className="ProfileDropdown">
      <li>
        <Link
          to={`/${response.document.userName}`}
          state={{ userID: response.document.uid }}
        >
          <img src={userIcon} alt="Profile" />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/settings">
          <img src={settingsIcon} alt="Settings" />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <img src={bookmarkIcon} alt="Saved" />
        <span>Saved</span>
      </li>
      <li onClick={logout}>
        {isPending ? 'Loading' : 'Logout'}
        {error && <p className="logout-error">{error}</p>}
      </li>
    </ul>
  );
};

export default ProfileDropdown;
