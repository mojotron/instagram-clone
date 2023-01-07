import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// styles
import './styles/Search.css';
// icons
import { GrClose } from 'react-icons/gr';
// components
import Avatar from '../../../components/Avatar';
import { useEffect } from 'react';

const SearchUserCard = ({ data, recent }) => {
  return (
    <div className="SearchUserCard">
      <div className="SearchUserCard__wrapper">
        <Avatar url={data.avatar.url} size="small" />
        <div className="SearchUserCard__wrapper__name">
          <h2>{data.userName}</h2>
          <h3>{data.fullName}</h3>
        </div>
      </div>

      {recent && (
        <button className="btn">
          <GrClose size={15} />
        </button>
      )}
    </div>
  );
};

const SearchResults = () => {
  const navigate = useNavigate();

  const [recentSearch, setRecentSearch] = useState(
    JSON.parse(localStorage.getItem('instagram-clone-recent-search')) || []
  );

  const handleClearAllRecent = () => {};

  const handleRemoveRecent = () => {};

  useEffect(() => {}, []);

  return (
    <div className="SearchResults">
      <header className="SearchResults__header">
        <h3>Recent</h3>
        <button className="btn btn--blue">Clear all</button>
      </header>
      <div className="SearchResults__container">
        {recentSearch.length > 0 &&
          recentSearch.map(user => (
            <SearchUserCard data={user} recent={true} />
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
