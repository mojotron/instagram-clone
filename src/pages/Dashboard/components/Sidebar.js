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
import SearchBar from './SearchBar';

const Sidebar = ({ screenSize }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleMoreOptions = () => setShowMoreOptions(oldValue => !oldValue);
  const toggleSearchBar = () => setShowSearchBar(oldValue => !oldValue);

  console.log(showSearchBar);

  return (
    <div
      className="Sidebar"
      style={{ width: screenSize === 'large' ? '240px' : '85px' }}
    >
      <Link to="/">
        <header className="Sidebar__header">
          {screenSize === 'large' ? (
            <h1>Instagram Clone</h1>
          ) : (
            <BsInstagram size={25} />
          )}
        </header>
      </Link>

      <Navbar
        direction="column"
        screenSize={screenSize}
        toggleShowSearchBar={toggleSearchBar}
      />

      {showSearchBar && <SearchBar screenSize={screenSize} />}

      {showMoreOptions && <MoreOptions />}

      <NavbarItem
        icon={<GiHamburgerMenu size={25} />}
        link={null}
        screenSize={screenSize}
        headings="More"
        handleClick={toggleMoreOptions}
      />
    </div>
  );
};

export default Sidebar;
