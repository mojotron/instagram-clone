import './styles/Header.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Header = ({ toggleShowCreatePost }) => {
  return (
    <header className="Header">
      <Link to="/">
        <h1>Instagram Clone</h1>
      </Link>
      <Navbar toggleShowCreatePost={toggleShowCreatePost} />
    </header>
  );
};

export default Header;
