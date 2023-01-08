// components
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
// style
import './styles/Search.css';

const Search = () => {
  // preform search query
  const search = searchTerm => {
    console.log('collect:', searchTerm);
  };

  return (
    <div className="Search">
      <h2>Search</h2>
      <SearchBar handleSearch={search} />
      <SearchResults />
    </div>
  );
};

export default Search;
