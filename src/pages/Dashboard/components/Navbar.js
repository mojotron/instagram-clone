import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ProfileDropdown from './ProfileDropdown';
// icon images
import { BsSearch } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { CgHome, CgAddR } from 'react-icons/cg';
// style
import './styles/Navbar.css';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const Navbar = ({
  direction,
  screenSize,
  toggleShowCreatePost,
  toggleShowSearchBar,
  toggleNotifications,
}) => {
  const { response } = useUserDataContext();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="Navbar">
      <ul style={{ flexDirection: direction }}>
        <NavLink to="/">
          <li className="Navbar__item">
            <CgHome size={25} />
            {screenSize === 'large' && <h2>Home</h2>}
          </li>
        </NavLink>
        <li className="Navbar__item" onClick={toggleShowSearchBar}>
          <BsSearch size={25} />
          {screenSize === 'large' && <h2>Search</h2>}
        </li>
        <NavLink to="/explore">
          <li className="Navbar__item">
            <MdOutlineExplore size={25} />
            {screenSize === 'large' && <h2>Explore</h2>}
          </li>
        </NavLink>
        <NavLink to="/direct">
          <li className="Navbar__item">
            <FiSend size={25} />
            {screenSize === 'large' && <h2>Messages</h2>}
          </li>
        </NavLink>
        <li className="Navbar__item" onClick={toggleNotifications}>
          <AiOutlineHeart size={25} />
          {screenSize === 'large' && <h2>Notifications</h2>}
        </li>
        <li className="Navbar__item" onClick={toggleShowCreatePost}>
          <CgAddR size={25} />
          {screenSize === 'large' && <h2>Create</h2>}
        </li>
        <li
          className="Navbar__item"
          onClick={() => setShowDropdown(oldValue => !oldValue)}
        >
          <Avatar url={response.document.avatar.url} size="small" />
          {screenSize === 'large' && <h2>Profile</h2>}

          {showDropdown && <ProfileDropdown />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
