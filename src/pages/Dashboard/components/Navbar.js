import homeIcon from '../../../images/home-filled.svg';
import './styles/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <NavLink to="/">
            <img className="Navbar__icon" src={homeIcon} alt="home" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
