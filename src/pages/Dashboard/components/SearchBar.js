import { useState, useEffect, useRef } from 'react';
// styles
import './styles/Search.css';
// icons
import { IoIosCloseCircle } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef();

  console.log('Focus is', hasFocus ? 'on' : 'off');

  useEffect(() => {
    // debounce search call, call search one and half second after user
    // stops typing
    if (searchTerm === '') return;
    console.log('call debounce');
    const debounce = setTimeout(() => {
      handleSearch(searchTerm);
    }, 1500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClearSearch = () => {
    console.log('clearing search');
    setSearchTerm('');
    setHasFocus(false);
  };

  return (
    <form className="SearchBar">
      <label>
        {!hasFocus && <BsSearch size={15} />}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          placeholder="Search..."
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        {hasFocus && (
          <button type="button" className="btn" onMouseDown={handleClearSearch}>
            <IoIosCloseCircle size={15} color={'var(--gray)'} />
          </button>
        )}
      </label>
    </form>
  );
};

export default SearchBar;
