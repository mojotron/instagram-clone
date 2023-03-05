import './styles/MoreOptions.css';
import { Link } from 'react-router-dom';
// icons
import { RiSettings5Fill } from 'react-icons/ri';
import { FiBookmark } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
// hooks
import { useLogout } from '../../../hooks/useLogout';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const MoreOptions = () => {
  const { response, setNavigationTab } = useUserDataContext();
  const { isPending, error, logout } = useLogout();
  return (
    <ul className="MoreOptions">
      <li>
        <Link
          onClick={() => setNavigationTab('profile')}
          to={`/${response.document.userName}`}
          state={{ activeTab: 'posts' }}
          // state={{ userID: response.document.uid }}
        >
          <span>Profile</span>
          <CgProfile size={20} />
        </Link>
      </li>
      <li>
        <Link to="/settings" onClick={() => setNavigationTab('home')}>
          <span>Settings</span>
          <RiSettings5Fill size={20} />
        </Link>
      </li>
      <li>
        <Link
          onClick={() => setNavigationTab('profile')}
          to={`/${response.document.userName}`}
          state={{ activeTab: 'saved' }}
        >
          <span>Saved</span>
          <FiBookmark size={20} />
        </Link>
      </li>
      <li onClick={logout}>
        {isPending ? 'Loading' : 'Logout'}
        {error && <p className="logout-error">{error}</p>}
      </li>
    </ul>
  );
};

export default MoreOptions;
