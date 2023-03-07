// hooks
import { useState, useRef, useEffect } from 'react';
import { useSuggestedUsersContext } from '../../../hooks/useSuggestedUsersContext';
import { useSearchUsers } from '../../../hooks/useSearchUsers';
// style
import './styles/NewMessage.css';
// icons
import { GrClose } from 'react-icons/gr';
// components
import Avatar from '../../../components/Avatar';
import { useCollectDocsByIdList } from '../../../hooks/useCollectDocsByIdList';

const NewMessage = ({ setShowNewMessage, setMessageTo }) => {
  const { notFollowingBack, followersFollowings } = useSuggestedUsersContext();
  const { getAllUsersStartingWith } = useSearchUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const { documents: searchedUsersDoc } = useCollectDocsByIdList(
    searchResults,
    'users'
  );

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // search for users with debounce

  useEffect(() => {
    if (searchTerm === '') return;
    let isMounted = true;
    console.log('call debounce');
    setIsPending(true);
    setError(null);

    const debounce = setTimeout(async () => {
      try {
        const results = await getAllUsersStartingWith(searchTerm);
        if (isMounted) {
          setSearchResults(results);
          setIsPending(false);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setError('Network error, please try again later!');
          setIsPending(false);
        }
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [searchTerm, getAllUsersStartingWith]);

  useEffect(() => {
    if (searchTerm !== '') return;
    setError(null);
    setIsPending(false);
    setSearchResults(null);
  }, [searchTerm]);

  const handleMessageToUser = user => {
    setMessageTo(user);
    setShowNewMessage(false);
  };

  return (
    <div className="overlay">
      <div className="NewMessage">
        <header className="NewMessage__header">
          <button className="btn" onClick={() => setShowNewMessage(false)}>
            <GrClose size={18} />
          </button>
          <h2>New message</h2>
          <button className="btn btn--blue">Next</button>
        </header>

        <div className="NewMessage__search">
          <label>To:</label>
          <input
            ref={inputRef}
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="NewMessage__user-list">
          {isPending && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {!searchResults &&
            notFollowingBack &&
            followersFollowings &&
            [...notFollowingBack, ...followersFollowings].map(userDoc => (
              <div
                key={userDoc.id}
                className="NewMessage__user-list__item"
                onClick={() => handleMessageToUser(userDoc.id)}
              >
                <Avatar url={userDoc.avatar.url} size={35} />
                <div className="NewMessage__user-list__item__info">
                  <h2>{userDoc.userName}</h2>
                  <h3>{userDoc.fullName}</h3>
                </div>
              </div>
            ))}

          {searchResults &&
            searchedUsersDoc &&
            searchedUsersDoc.map(user => (
              <div
                key={user.id}
                className="NewMessage__user-list__item"
                onClick={() => handleMessageToUser(user.id)}
              >
                <Avatar url={user.avatar.url} size={35} />
                <div className="NewMessage__user-list__item__info">
                  <h2>{user.userName}</h2>
                  <h3>{user.fullName}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
