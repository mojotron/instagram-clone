import './styles/Search.css';

const SearchResults = () => {
  return (
    <div className="SearchResults">
      <header className="SearchResults__header">
        <h3>Recent</h3>
        <button className="btn btn--blue">Clear all</button>
      </header>
    </div>
  );
};

export default SearchResults;
