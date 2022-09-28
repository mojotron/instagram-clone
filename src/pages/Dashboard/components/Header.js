import './styles/Header.css';
import Navbar from './Navbar';

const Header = ({ userData }) => {
  return (
    <header className="Header">
      <h1>Instagram Clone</h1>
      <Navbar userData={userData} />
    </header>
  );
};

export default Header;
