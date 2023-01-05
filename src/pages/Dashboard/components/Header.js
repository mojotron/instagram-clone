import './styles/Header.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useState } from 'react';

const Header = ({ toggleShowCreatePost, toggleNotifications }) => {
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
    </header>
  );
};

export default Header;
