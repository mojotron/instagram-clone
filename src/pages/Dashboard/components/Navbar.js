import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ProfileDropdown from './ProfileDropdown';
// icon images
import homeIcon from '../../../images/home-filled.svg';
import addPostIcon from '../../../images/add-icon.svg';
import searchIcon from '../../../images/search-icon.svg';
import { FiSend } from 'react-icons/fi';
// style
import './styles/Navbar.css';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const Navbar = ({ toggleShowCreatePost, toggleShowSearchBar }) => {
  const { response } = useUserDataContext();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="Navbar">
      <ul>
        <li className="Navbar__item" onClick={toggleShowSearchBar}>
          <img src={searchIcon} alt="search for user" />
        </li>
        <li className="Navbar__item">
          <NavLink to="/direct">
            <FiSend size={20} />
          </NavLink>
        </li>
        <li className="Navbar__item">
          <NavLink to="/">
            <img className="Navbar__icon" src={homeIcon} alt="home" />
          </NavLink>
        </li>
        <li className="Navbar__item" onClick={toggleShowCreatePost}>
          <img className="Navbar__icon" src={addPostIcon} alt="add post" />
        </li>
        <li
          className="Navbar__item"
          onClick={() => setShowDropdown(oldValue => !oldValue)}
        >
          <Avatar url={response.document.avatar.url} size="small" />
          {showDropdown && <ProfileDropdown />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
