import { useState, useRef, useEffect } from 'react';
// style
import './styles/NewMessage.css';
// icons
import { GrClose } from 'react-icons/gr';
// hooks
import { useCollectSuggestedUsers } from '../../../hooks/useCollectSuggestedUsers';
import { useSearchUsers } from '../../../hooks/useSearchUsers';
import Avatar from '../../../components/Avatar';

const NewMessage = ({ setShowNewMessage, setMessageTo }) => {
  // TODO fetch suggested users
  const { getSuggestedUsersMessagesDocuments } = useCollectSuggestedUsers();
  const { documents, isPending, error, searchForUsers, reset } =
    useSearchUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();
  const search = useRef(str => searchForUsers(str)).current;

  console.log(documents);

  useEffect(() => {
    getSuggestedUsersMessagesDocuments();
  }, [getSuggestedUsersMessagesDocuments]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (searchTerm === '') return;
    const debounce = setTimeout(() => {
      console.log('call debounce');
      search(searchTerm);
    }, 2000);

    return () => clearTimeout(debounce);
  }, [searchTerm, search]);

  const handleMessageToUser = user => {
    setMessageTo(user);
    reset();
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

          {documents &&
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
