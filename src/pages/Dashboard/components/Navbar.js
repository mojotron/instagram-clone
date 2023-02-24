// components
import Avatar from '../../../components/Avatar';
import NavbarItem from './NavbarItem';
// icon images
import { BsSearch } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { CgHome, CgAddR } from 'react-icons/cg';
// style
import './styles/Navbar.css';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useNavigate } from 'react-router-dom';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';

const Navbar = ({ direction }) => {
  const { response, toggleModal, closeModals } = useUserDataContext();
  const { screenSize } = useScreenSizeContext();
  const navigate = useNavigate();

  const rowStyle = {
    flexDirection: direction,
    justifyContent: 'space-around',
  };
  const columnStyle = {
    flexDirection: direction,
    justifyContent: 'flex-start',
  };

  return (
    <nav className="Navbar">
      <ul style={direction === 'row' ? rowStyle : columnStyle}>
        <NavbarItem
          icon={<CgHome size={25} />}
          link="/"
          headings="Home"
          handleClick={null}
        />
        {screenSize !== 'small' && (
          <NavbarItem
            icon={<BsSearch size={25} />}
            link={null}
            headings="Search"
            handleClick={e => toggleModal(e, 'openSearch')}
          />
        )}
        <NavbarItem
          icon={<MdOutlineExplore size={25} />}
          link="/explore"
          headings="Explore"
          handleClick={null}
        />
        <NavbarItem
          icon={<FiSend size={25} />}
          link="/direct"
          headings="Messages"
          handleClick={null}
        />
        {screenSize !== 'small' && (
          <div className="Navbar__item-wrapper">
            <NavbarItem
              icon={<AiOutlineHeart size={25} />}
              link={null}
              headings="Notifications"
              handleClick={e => toggleModal(e, 'openNotifications')}
            />
            {response.document.newNotification && (
              <span className="Navbar__item-new-dot" />
            )}
          </div>
        )}
        <NavbarItem
          icon={<CgAddR size={25} />}
          link={null}
          headings="Create"
          handleClick={e => toggleModal(e, 'openCreatePost')}
        />
        <NavbarItem
          icon={<Avatar url={response.document.avatar.url} size={25} />}
          link={null}
          headings="Profile"
          handleClick={() =>
            navigate(`/${response.document.userName}`, {
              state: { activeTab: 'posts' },
            })
          }
        />
      </ul>
    </nav>
  );
};

export default Navbar;
