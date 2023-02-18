import { useEffect, useState } from 'react';
import { useSearchUsers } from '../../../hooks/useSearchUsers';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';

// components
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
// style
import './styles/Search.css';
import { useOnSnapshotDocument } from '../../../hooks/useOnSnapshotDocument';
import { useUserDataContext } from '../../../hooks/useUserDataContext';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [recentSearch, setRecentSearch] = useState(null);
  const [modifyRecentSearch, setModifyRecentSearch] = useState(true);
  const { getAllUsersStartingWith, getRecentSearch } = useSearchUsers();
  // get docs
  const { documents: currentSearchDocs } = useCollectDocsByIdList(
    searchResults,
    'users'
  );
  const { documents: recentSearchDocs } = useCollectDocsByIdList(
    recentSearch,
    'users'
  );

  useEffect(() => {
    if (modifyRecentSearch === false) return;
    let isMounted = true;
    const loadRecentSearch = async () => {
      try {
        const data = await getRecentSearch();
        if (isMounted) {
          setRecentSearch(data.recentSearch);
          setModifyRecentSearch(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadRecentSearch();
    return () => {
      isMounted = false;
    };
  }, [getRecentSearch, modifyRecentSearch]);

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
      <SearchResults
        // conditional here is for case when user clear search bar
        currentSearch={searchResults ? currentSearchDocs : null}
        recentSearch={recentSearch ? recentSearchDocs : null}
        setModifyRecentSearch={setModifyRecentSearch}
      />
    </div>
  );
};

export default Search;
