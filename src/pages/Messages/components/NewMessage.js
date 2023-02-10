// hooks
import { useState, useRef, useEffect } from 'react';
import { useCollectSuggestedUsers } from '../../../hooks/useCollectSuggestedUsers';
import { useSearchUsers } from '../../../hooks/useSearchUsers';
// style
import './styles/NewMessage.css';
// icons
import { GrClose } from 'react-icons/gr';
// components
import Avatar from '../../../components/Avatar';

const NewMessage = ({ setShowNewMessage, setMessageTo }) => {
  // TODO fetch suggested users
  const { documents: suggestedUsers, getSuggestedUsersMessagesDocuments } =
    useCollectSuggestedUsers();
  // refactored
  const { getAllUsersStartingWith } = useSearchUsers();
  const [searchTerm, setSearchTerm] = useState('');
  // TODO
  const [searchResults, setSearchResults] = useState(null);
  const inputRef = useRef();

  // const search = useRef(str => searchForUsers(str)).current;
  // const suggestedUsersRef = useRef(getSuggestedUsersMessagesDocuments).current;

  console.log(suggestedUsers);

  // useEffect(() => {
  //   suggestedUsersRef();
  // }, [suggestedUsersRef]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (searchTerm === '') return;
    const debounce = setTimeout(async () => {
      console.log('call debounce');
      const results = await getAllUsersStartingWith(searchTerm);
      console.log('debounce result', results);
    }, 2000);

    return () => clearTimeout(debounce);
  }, [searchTerm, getAllUsersStartingWith]);

  // const handleMessageToUser = user => {
  //   setMessageTo(user);
  //   reset();
  //   setShowNewMessage(false);
  // };

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
          {/* {isPending && <p>Loading...</p>}
          {error && <p>{error}</p>} */}

          {/* {suggestedUsers &&
            !documents &&
            suggestedUsers.map(user => (
              <div
                key={user.id}
                className="NewMessage__user-list__item"
                onClick={() => handleMessageToUser(user)}
              >
                <Avatar url={user.avatar.url} size="mid" />
                <div className="NewMessage__user-list__item__info">
                  <h2>{user.userName}</h2>
                  <h3>{user.fullName}</h3>
                </div>
              </div>
            ))} */}

          {/* {documents &&
            documents.map(user => (
              <div
                key={user.id}
                className="NewMessage__user-list__item"
                onClick={() => handleMessageToUser(user)}
              >
                <Avatar url={user.avatar.url} size="mid" />
                <div className="NewMessage__user-list__item__info">
                  <h2>{user.userName}</h2>
                  <h3>{user.fullName}</h3>
                </div>
              </div>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
