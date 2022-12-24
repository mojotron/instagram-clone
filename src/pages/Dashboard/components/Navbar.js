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
  toggleShowCreatePost,
  toggleShowSearchBar,
  toggleNotifications,
}) => {
  const { response } = useUserDataContext();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="Navbar">
      <ul>
        <li className="Navbar__item">
          <NavLink to="/">
            <CgHome size={20} />
          </NavLink>
        </li>
        <li className="Navbar__item" onClick={toggleShowSearchBar}>
          <BsSearch size={20} />
        </li>
        <li className="Navbar__item">
          <NavLink to="/explore">
            <MdOutlineExplore size={20} />
          </NavLink>
        </li>
        <li className="Navbar__item">
          <NavLink to="/direct">
            <FiSend size={20} />
          </NavLink>
        </li>
        <li className="Navbar__item" onClick={toggleNotifications}>
          <AiOutlineHeart size={20} />
        </li>
        <li className="Navbar__item" onClick={toggleShowCreatePost}>
          <CgAddR size={20} />
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
