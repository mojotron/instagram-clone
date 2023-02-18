import { useSearchUsers } from '../../../hooks/useSearchUsers';
// components
import SearchUserCard from './SearchUserCard';
// styles
import './styles/Search.css';

const SearchResults = ({
  currentSearch,
  recentSearch,
  setModifyRecentSearch,
}) => {
  const { clearRecentSearch } = useSearchUsers();

  const handleClearRecentSearch = async () => {
    try {
      await clearRecentSearch();
      setModifyRecentSearch(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SearchResults">
      <header className="SearchResults__header">
        {!currentSearch && <h3>Recent</h3>}
        {!currentSearch && (
          <button className="btn btn--blue" onClick={handleClearRecentSearch}>
            Clear all
          </button>
        )}
      </header>
      <div className="SearchResults__container">
        {currentSearch &&
          currentSearch.map(user => (
            <SearchUserCard
              key={user.id}
              data={user}
              recent={false}
              setModifyRecentSearch={setModifyRecentSearch}
            />
          ))}
        {!currentSearch &&
          recentSearch &&
          recentSearch.map(user => (
            <SearchUserCard
              key={user.id}
              data={user}
              recent={true}
              setModifyRecentSearch={setModifyRecentSearch}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
