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
  const navigate = useNavigate();

  const handleUserClick = () => {
    // navigate to user
    // add user to recent list
    // close navigation
    navigate(`/${data.userName}`);
  };

  return (
    <div
      className="SearchUserCard"
      onClick={handleUserClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="SearchUserCard__wrapper">
        <Avatar url={data.avatar.url} size={35} />
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

const SearchResults = ({ userList }) => {
  const [recentSearch, setRecentSearch] = useState(
    JSON.parse(localStorage.getItem('instagram-clone-recent-search')) || []
  );

  const handleClearAllRecent = () => {};

  const handleRemoveRecent = () => {};

  useEffect(() => {}, []);

  return (
    <div className="SearchResults">
      <header className="SearchResults__header">
        {!userList && <h3>Recent</h3>}
        {!userList && <button className="btn btn--blue">Clear all</button>}
      </header>
      <div className="SearchResults__container">
        {userList &&
          userList.map(user => (
            <SearchUserCard key={user.id} data={user} recent={false} />
          ))}
        {!userList &&
          recentSearch.length > 0 &&
          recentSearch.map(user => (
            <SearchUserCard key={user.id} data={user} recent={true} />
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
