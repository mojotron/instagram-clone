import { useState, useEffect, useRef } from 'react';
// styles
import './styles/Search.css';
// icons
import { IoIosCloseCircle } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  startFocus,
  handleHeaderSearch,
}) => {
  const [hasFocus, setHasFocus] = useState(startFocus);
  const inputRef = useRef();

  useEffect(() => {
    if (startFocus) {
      inputRef.current.focus();
    }
  }, [startFocus]);

  const handleClearSearch = () => {
    console.log('clearing search');
    setSearchTerm('');
    setHasFocus(false);
    if (handleHeaderSearch) handleHeaderSearch(false);
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
          onFocus={() => {
            setHasFocus(true);
            if (handleHeaderSearch) handleHeaderSearch(true);
          }}
          onBlur={() => {
            setHasFocus(false);
          }}
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
