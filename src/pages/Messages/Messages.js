import { useState, useRef } from 'react';
// components
import NewMessage from './components/NewMessage';
import MessagesHeader from './components/MessagesHeader';
import MessageMainBody from './components/MessageMainBody';
// style
import './styles/Messages.css';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useCollectUsers } from '../../hooks/useCollectUsers';
import Avatar from '../../components/Avatar';

const Messages = () => {
  const { response } = useUserDataContext();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [messageTo, setMessageTo] = useState(null);

  const messagesList = useRef(
    response.document.messages.map(msg => msg.messageTo)
  ).current;
  const { documents } = useCollectUsers(messagesList);

  console.log(documents);

  return (
    <div className="Messages">
      {showNewMessage && (
        <NewMessage
          setShowNewMessage={setShowNewMessage}
          setMessageTo={setMessageTo}
        />
      )}
      <div className="Messages__left">
        <MessagesHeader setShowNewMessage={setShowNewMessage} />
        <section>
          {documents &&
            documents.map(user => (
              <div
                key={user.uid}
                onClick={() => setMessageTo(user)}
                className="Messages__left__list-item"
              >
                <Avatar url={user.avatar.url} size="mid" />
                <h2>{user.userName}</h2>
                {/* message set time */}
              </div>
            ))}
        </section>
      </div>
      <div className="Messages__right">
        {messageTo && <MessageMainBody user={messageTo} />}
      </div>
    </div>
  );
};

export default Messages;
