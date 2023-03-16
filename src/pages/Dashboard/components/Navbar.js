// components
import Avatar from '../../../components/Avatar';
import NavbarItem from './NavbarItem';
// icon images
import { BsSearch } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { MdExplore, MdOutlineExplore } from 'react-icons/md';
import { CgAddR } from 'react-icons/cg';
import { RiSendPlaneFill } from 'react-icons/ri';
import { AiOutlineHome, AiFillHome, AiOutlineHeart } from 'react-icons/ai';
// style
import './styles/Navbar.css';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useNavigate } from 'react-router-dom';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';

const Navbar = ({ direction }) => {
  const { response, toggleModal, navigationTab, setNavigationTab } =
    useUserDataContext();
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
          icon={
            navigationTab === 'home' ? (
              <AiFillHome size={25} />
            ) : (
              <AiOutlineHome size={25} />
            )
          }
          link="/"
          headings="Home"
          handleClick={() => setNavigationTab('home')}
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
          icon={
            navigationTab === 'explore' ? (
              <MdExplore size={25} />
            ) : (
              <MdOutlineExplore size={25} />
            )
          }
          link="/explore"
          headings="Explore"
          handleClick={() => setNavigationTab('explore')}
        />
        <NavbarItem
          icon={
            navigationTab === 'messages' ? (
              <RiSendPlaneFill size={25} />
            ) : (
              <FiSend size={25} />
            )
          }
          link="/direct"
          headings="Messages"
          handleClick={() => setNavigationTab('messages')}
        />
        {screenSize !== 'small' && (
          <div className="Navbar__item-wrapper">
            <NavbarItem
              icon={<AiOutlineHeart size={25} />}
              link={null}
              headings="Notifications"
              handleClick={e => {
                toggleModal(e, 'openNotifications');
              }}
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
          icon={
            <Avatar
              url={response.document.avatar.url}
              size={25}
              activeBorder={navigationTab === 'profile'}
            />
          }
          link={null}
          headings="Profile"
          handleClick={() => {
            navigate(`/${response.document.userName}`, {
              state: { activeTab: 'posts' },
            });
            setNavigationTab('profile');
          }}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
