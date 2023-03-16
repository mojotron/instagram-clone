import { useNavigate } from 'react-router-dom';
import { useRecentSearch } from '../../../hooks/useRecentSearch';
// icons
import { GrClose } from 'react-icons/gr';
// components
import Avatar from '../../../components/Avatar';

const SearchUserCard = ({ data, recent, setModifyRecentSearch }) => {
  const navigate = useNavigate();
  const { addUserToRecentSearch, getRecentSearch, removeUserFromRecentSearch } =
    useRecentSearch();

  const handleUserClick = async () => {
    // add user to recent list
    const doc = await getRecentSearch();
    await addUserToRecentSearch(data.id, doc ? doc.recentSearch : null);
    // navigate to user
    navigate(`/${data.userName}`);
    // close search
  };

  const handleRemoveUserClick = async e => {
    e.stopPropagation();
    const doc = await getRecentSearch();
    await removeUserFromRecentSearch(data.id, doc.recentSearch);
    setModifyRecentSearch(true);
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
        <button className="btn" onClick={e => handleRemoveUserClick(e)}>
          <GrClose size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchUserCard;
