import { useEffect, useState } from 'react';
import './styles/SearchBar.css';
import { useNavigate } from 'react-router-dom';
// icons
import closeIcon from '../../../images/close-icon.svg';
import searchIcon from '../../../images/search-icon.svg';
// hooks
import { useSearchUsers } from '../../../hooks/useSearchUsers';
import { useRef } from 'react';
// components
import Avatar from '../../../components/Avatar';

const SearchBar = () => {
  const { documents, isPending, error, searchForUsers, reset } =
    useSearchUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [focus, setFocus] = useState(false);
  // TODO
  const [recentSearch, setRecentSearch] = useState(
    JSON.parse(localStorage.getItem('instagram-clone-recent-search')) || []
  );

  const navigate = useNavigate();

  const search = useRef(str => searchForUsers(str)).current;

  useEffect(() => {
    if (searchTerm === '') return;
    console.log('call', searchTerm);
    const debounce = setTimeout(() => {
      search(searchTerm);
    }, 2000);

    return () => clearTimeout(debounce);
  }, [searchTerm, search]);

  useEffect(() => {
    localStorage.setItem(
      'instagram-clone-recent-search',
      JSON.stringify(recentSearch)
    );
  }, [recentSearch]);

  const handleResetSearch = e => {
    // e.stopPropagation();
    console.log('reset');
    setSearchTerm('');
    setFocus(false);
  };

  const handleSelectSearchedUser = user => {
    navigate(`/${user.userName}`);
    handleResetSearch();
    reset();
    setRecentSearch(oldValue => [
      ...oldValue,
      {
        id: user.id,
        userName: user.userName,
        fullName: user.fullName,
        avatar: { url: user.avatar.url },
      },
    ]);
  };

  return (
    <div className="SearchBar">
      <form className="SearchBar__form">
        <label>
          {!focus && (
            <img
              src={searchIcon}
              alt="search bar"
              className="SearchBar__form__search-icon"
            />
          )}

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            className={focus ? 'active' : ''}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            // onClick={e => e.stopPropagation()}
          />
        </label>

        {(searchTerm !== '' || focus) && (
          <img
            src={closeIcon}
            alt="search bar"
            className="SearchBar__form__close-icon"
            onClick={handleResetSearch}
          />
        )}
      </form>
      {(searchTerm !== '' || focus) && (
        <section className="SearchBar__results">
          {isPending && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {searchTerm === '' &&
            recentSearch.map(doc => (
              <div key={doc.id} className="SearchBar__results__item">
                <Avatar
                  url={doc.avatar.url}
                  size="mid-3"
                  handleClick={() => handleSelectSearchedUser(doc)}
                />
                <div className="SearchBar__results__item__info">
                  <h2 onClick={() => handleSelectSearchedUser(doc)}>
                    {doc.userName}
                  </h2>
                  <h3>{doc.fullName}</h3>
                </div>
              </div>
            ))}

          {documents &&
            documents.map(doc => (
              <div key={doc.id} className="SearchBar__results__item">
                <Avatar
                  url={doc.avatar.url}
                  size="mid-3"
                  handleClick={() => handleSelectSearchedUser(doc)}
                />
                <div className="SearchBar__results__item__info">
                  <h2 onClick={() => handleSelectSearchedUser(doc)}>
                    {doc.userName}
                  </h2>
                  <h3>{doc.fullName}</h3>
                </div>
              </div>
            ))}
        </section>
      )}
    </div>
  );
};

export default SearchBar;
