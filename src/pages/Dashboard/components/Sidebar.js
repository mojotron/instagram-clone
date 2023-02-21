// hooks
import { Link } from 'react-router-dom';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
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

const Sidebar = ({ toggleShowCreatePost }) => {
  const { screenSize, fixedSize } = useScreenSizeContext();
  const { modals, toggleModal } = useUserDataContext();

  return (
    <div
      className="Sidebar"
      style={{
        width: screenSize === 'large' && !fixedSize ? '240px' : '85px',
      }}
    >
      <Link to="/">
        <header className="Sidebar__header">
          {screenSize === 'large' && !fixedSize && !modals.openSearch ? (
            <h1>Instagram Clone</h1>
          ) : (
            <BsInstagram size={25} />
          )}
        </header>
      </Link>

      <Navbar direction="column" toggleShowCreatePost={toggleShowCreatePost} />

      {modals.openMoreOptions && <MoreOptions />}
      {modals.openSearch && <Search screenSize={screenSize} />}

      <NavbarItem
        icon={<GiHamburgerMenu size={25} />}
        link={null}
        headings="More"
        handleClick={e => toggleModal(e, 'openMoreOptions')}
      />
    </div>
  );
};

export default Sidebar;
