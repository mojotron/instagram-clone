import { useSearch } from '../../../hooks/useSearch';
// components
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import InfoPopUpBox from '../../../components/InfoPopUpBox';
// style
import './styles/Search.css';
// constants
import {
  SEARCH_POPUP_TITLE,
  SEARCH_POPUP_MSG,
} from '../../../constants/constants';

const Search = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    recentSearch,
    currentSearchDocs,
    recentSearchDocs,
    setModifyRecentSearch,
  } = useSearch();

  return (
    <div className="Search" onClick={e => e.stopPropagation()}>
      <InfoPopUpBox title={SEARCH_POPUP_TITLE} message={SEARCH_POPUP_MSG} />

      <h2>Search</h2>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startFocus={true}
        handleHeaderSearch={null}
      />
      <SearchResults
        // conditional here is for case when user clear search bar
        currentSearch={searchResults ? currentSearchDocs : null}
        recentSearch={recentSearch ? recentSearchDocs : null}
        setModifyRecentSearch={setModifyRecentSearch}
        isHeader={false}
      />
    </div>
  );
};

export default Search;
