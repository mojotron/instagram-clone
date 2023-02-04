// hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
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

const Sidebar = ({
  toggleShowCreatePost,
  showNotifications,
  toggleNotifications,
  showSearch,
  toggleSearch,
}) => {
  const { screenSize, fixedSize } = useScreenSizeContext();
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleMoreOptions = () => setShowMoreOptions(oldValue => !oldValue);

  return (
    <div
      className="Sidebar"
      style={{
        width:
          fixedSize === 'medium'
            ? '85px'
            : screenSize === 'large'
            ? '240px'
            : '85px',
      }}
    >
      <Link to="/">
        <header className="Sidebar__header">
          {screenSize === 'large' && !fixedSize && !showSearch ? (
            <h1>Instagram Clone</h1>
          ) : (
            <BsInstagram size={25} />
          )}
        </header>
      </Link>

      <Navbar
        direction="column"
        toggleSearch={toggleSearch}
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
