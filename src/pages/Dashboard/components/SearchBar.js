import { useEffect, useState } from 'react';
import './styles/SearchBar.css';
// icons
import closeIcon from '../../../images/close-icon.svg';
import searchIcon from '../../../images/search-icon.svg';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focus, setFocus] = useState(false);

  console.log(searchTerm);
  // save recent search terms
  // focus on click

  // useEffect(() => {
  //   if (searchTerm === '') return;
  //   const debounce = setTimeout(() => {
  //     console.log(searchTerm);
  //   }, 2000);

  //   return () => clearTimeout(debounce);
  // }, [searchTerm]);

  const handleResetSearch = e => {
    // e.stopPropagation();
    console.log('reset');
    setSearchTerm('');
    setFocus(false);
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
        {searchTerm !== '' && (
          <img
            src={closeIcon}
            alt="search bar"
            className="SearchBar__form__close-icon"
            onClick={handleResetSearch}
          />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
