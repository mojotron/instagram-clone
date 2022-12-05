import './styles/Header.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ toggleShowCreatePost }) => {
  return (
    <header className="Header">
      <div className="Header__left">
        <Link to="/">
          <h1>Instagram Clone</h1>
        </Link>
        <SearchBar />
      </div>
      <Navbar toggleShowCreatePost={toggleShowCreatePost} />
    </header>
  );
};

export default Header;
