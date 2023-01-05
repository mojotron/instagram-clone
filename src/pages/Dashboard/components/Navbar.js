import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// components
import Avatar from '../../../components/Avatar';
import ProfileDropdown from './ProfileDropdown';
import NavbarItem from './NavbarItem';
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

  const rowStyle = {
    flexDirection: direction,
    justifyContent: 'space-around',
  };
  const columnStyle = {
    flexDirection: direction,
    justifyContent: 'flex-start',
  };

  return (
    <nav className="Navbar">
      <ul style={direction === 'row' ? rowStyle : columnStyle}>
        <NavbarItem
          icon={<CgHome size={25} />}
          link="/"
          screenSize={screenSize}
          headings="Home"
        />
        {screenSize !== 'small' && (
          <NavbarItem
            icon={<BsSearch size={25} />}
            link={null}
            screenSize={screenSize}
            headings="Search"
          />
        )}
        <NavbarItem
          icon={<MdOutlineExplore size={25} />}
          link="/explore"
          screenSize={screenSize}
          headings="Explore"
        />
        <NavbarItem
          icon={<FiSend size={25} />}
          link="/direct"
          screenSize={screenSize}
          headings="Messages"
        />
        {screenSize !== 'small' && (
          <NavbarItem
            icon={<AiOutlineHeart size={25} />}
            link={null}
            screenSize={screenSize}
            headings="Notifications"
          />
        )}
        <NavbarItem
          icon={<CgAddR size={25} />}
          link={null}
          screenSize={screenSize}
          headings="Create"
        />
        <NavbarItem
          icon={<Avatar url={response.document.avatar.url} size="small" />}
          link={null}
          screenSize={screenSize}
          headings="Profile"
        />
        {showDropdown && <ProfileDropdown />}
      </ul>
    </nav>
  );
};

export default Navbar;
