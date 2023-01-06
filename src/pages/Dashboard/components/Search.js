// components
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
// style
import './styles/Search.css';

const Search = () => {
  return (
    <div className="Search">
      <h2>Search</h2>
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default Search;
