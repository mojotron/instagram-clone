import { useState } from 'react';
import { Link } from 'react-router-dom';
// style
import './styles/Sidebar.css';
// icons
import { BsInstagram } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
// components
import Navbar from './Navbar';
import NavbarItem from './NavbarItem';
import MoreOptions from './MoreOptions';
import Search from './Search';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';

const Sidebar = ({ toggleShowCreatePost, toggleNotifications }) => {
  const { screenSize } = useScreenSizeContext();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMoreOptions = () => setShowMoreOptions(oldValue => !oldValue);
  const toggleSearchBar = () => setShowSearch(oldValue => !oldValue);

  return (
    <div
      className="Sidebar"
      style={{
        width: screenSize === 'large' && !showSearch ? '240px' : '85px',
      }}
    >
      <Link to="/">
        <header className="Sidebar__header">
          {screenSize === 'large' && !showSearch ? (
            <h1>Instagram Clone</h1>
          ) : (
            <BsInstagram size={25} />
          )}
        </header>
      </Link>

      <Navbar
        direction="column"
        toggleShowSearchBar={toggleSearchBar}
        toggleShowCreatePost={toggleShowCreatePost}
        toggleNotifications={toggleNotifications}
      />

      {showSearch && <Search screenSize={screenSize} />}

      {showMoreOptions && (
        <MoreOptions handleClose={() => setShowMoreOptions(false)} />
      )}

      <NavbarItem
        icon={<GiHamburgerMenu size={25} />}
        link={null}
        headings="More"
        handleClick={toggleMoreOptions}
      />
    </div>
  );
};

export default Sidebar;
