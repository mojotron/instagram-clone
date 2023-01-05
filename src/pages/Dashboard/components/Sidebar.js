import { Link } from 'react-router-dom';
// style
import './styles/Sidebar.css';
// icons
import { BsInstagram } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
// components
import Navbar from './Navbar';
import NavbarItem from './NavbarItem';

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

      <NavbarItem
        icon={<GiHamburgerMenu size={25} />}
        link={null}
        screenSize={screenSize}
        headings="More"
      />
    </div>
  );
};

export default Sidebar;
