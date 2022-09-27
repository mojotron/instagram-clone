import './styles/ProfileDropdown.css';
// icons
import userIcon from '../../../images/user-icon.svg';
import settingsIcon from '../../../images/settings-icon.svg';
import bookmarkIcon from '../../../images/bookmark-icon.svg';
import { useLogout } from '../../../hooks/useLogout';

const ProfileDropdown = () => {
  const { isPending, error, logout } = useLogout();
  return (
    <ul className="ProfileDropdown">
      <li>
        <img src={userIcon} alt="Profile" />
        <span>Profile</span>
      </li>
      <li>
        <img src={settingsIcon} alt="Settings" />
        <span>Settings</span>
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
