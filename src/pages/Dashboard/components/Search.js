import { useEffect, useState } from 'react';
import { useSearchUsers } from '../../../hooks/useSearchUsers';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';

// components
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
// style
import './styles/Search.css';

const Search = () => {
  // TODO
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const { getAllUsersStartingWith } = useSearchUsers();
  const { documents } = useCollectDocsByIdList(searchResults, 'users');

  useEffect(() => {
    // debounce search call, call search one and half second after user
    // stops typing
    let isMounted = true;
    if (searchTerm === '') {
      if (isMounted) {
        setSearchResults(null);
      }
      return;
    }
    const debounce = setTimeout(async () => {
      const searchResults = await getAllUsersStartingWith(searchTerm);
      if (isMounted) {
        setSearchResults(searchResults);
      }
    }, 1500);

    return () => {
      clearTimeout(debounce);
      isMounted = false;
    };
  }, [searchTerm, getAllUsersStartingWith]);

  return (
    <div className="Search">
      <h2>Search</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* conditional here is for case when user clear search bar */}
      <SearchResults userList={searchResults ? documents : null} />
    </div>
  );
};

export default Search;
