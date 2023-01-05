import './styles/Header.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useState } from 'react';
import NavbarItem from './NavbarItem';

const Header = ({ screenSize, toggleShowCreatePost, toggleNotifications }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleShowSearchBar = () => {
    setShowSearchBar(oldValue => !oldValue);
  };

  return (
    <header className="Header">
      <div className="Header__left">
        <Link to="/">
          <h1>Instagram Clone</h1>
        </Link>

        {showSearchBar && (
          <SearchBar toggleShowSearchBar={toggleShowSearchBar} />
        )}
      </div>
      <div className="Header__right">
        <NavbarItem
          icon={<AiOutlineHeart size={25} />}
          link={null}
          screenSize={screenSize}
          headings=""
        />
      </div>
    </header>
  );
};

export default Header;
