import homeIcon from '../../../images/home-filled.svg';
import './styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import Avatar from '../../../components/Avatar';

import ProfileDropdown from './ProfileDropdown';
import { useState } from 'react';

const Navbar = ({ userData }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/">
            <img className="Navbar__icon" src={homeIcon} alt="home" />
          </NavLink>
        </li>
        <li onClick={() => setShowDropdown(oldValue => !oldValue)}>
          <Avatar url={userData.avatar.url} size="small" />
          {showDropdown && <ProfileDropdown />}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
