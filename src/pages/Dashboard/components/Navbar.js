import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ProfileDropdown from './ProfileDropdown';
// icon images
import homeIcon from '../../../images/home-filled.svg';
import addPostIcon from '../../../images/add-icon.svg';
// style
import './styles/Navbar.css';

const Navbar = ({ userData, toggleShowCreatePost }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddNewPost, setShowAddNewPost] = useState(false);

  return (
    <nav className="Navbar">
      <ul>
        <li>
          <NavLink to="/">
            <img className="Navbar__icon" src={homeIcon} alt="home" />
          </NavLink>
        </li>
        <li onClick={toggleShowCreatePost}>
          <img className="Navbar__icon" src={addPostIcon} alt="add post" />
        </li>
        <li onClick={() => setShowDropdown(oldValue => !oldValue)}>
          <Avatar url={userData.avatar.url} size="small" />
          {showDropdown && <ProfileDropdown />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
