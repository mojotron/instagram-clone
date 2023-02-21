// hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScreenSizeContext } from '../../../hooks/useScreenSizeContext';
import { useUserDataContext } from '../../../hooks/useUserDataContext';
import { useSearch } from '../../../hooks/useSearch';
// icons
import { AiOutlineHeart } from 'react-icons/ai';
// style
import './styles/Header.css';
// components
import NavbarItem from './NavbarItem';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Header = () => {
  const { response, toggleModal } = useUserDataContext();
  const { screenSize } = useScreenSizeContext();
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    recentSearch,
    currentSearchDocs,
    recentSearchDocs,
    setModifyRecentSearch,
  } = useSearch();

  const [showHeaderSearch, setShowHeaderSearch] = useState(false);

  useEffect(() => {
    let isMounted;
    toggleModal(null, 'openSearch');
    if (isMounted) {
    }
    return () => (isMounted = false);
  }, [toggleModal]);

  return (
    <header className="Header">
      <div className="Header__left">
        <Link to="/">
          <h1>Instagram Clone</h1>
        </Link>
      </div>

      <div className="Header__right">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          startFocus={false}
          handleHeaderSearch={setShowHeaderSearch}
        />
        <div className="Navbar__item-wrapper">
          <NavbarItem
            icon={<AiOutlineHeart size={25} />}
            link={null}
            screenSize={screenSize}
            headings=""
            handleClick={e => toggleModal(e, 'openNotifications')}
          />
          {response.document.newNotification && (
            <span className="Navbar__item-new-dot" />
          )}
        </div>
      </div>

      {showHeaderSearch && (
        <SearchResults
          currentSearch={searchResults ? currentSearchDocs : null}
          recentSearch={recentSearch ? recentSearchDocs : null}
          setModifyRecentSearch={setModifyRecentSearch}
          isHeader={true}
        />
      )}
    </header>
  );
};

export default Header;
