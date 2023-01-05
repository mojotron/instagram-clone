import { Link } from 'react-router-dom';
// style
import './styles/Sidebar.css';
// icons
import { BsInstagram } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
// components
import Navbar from './Navbar';

const Sidebar = ({ screenSize }) => {
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

      <Navbar direction="column" screenSize={screenSize} />

      <div className="Navbar__item">
        <GiHamburgerMenu size={25} />
        {screenSize === 'large' && <h2>More</h2>}
      </div>
    </div>
  );
};

export default Sidebar;
