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

import { formatTime } from '../../utils/formatTime';

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
                className="Messages__left__list-item"
                key={user.uid}
                onClick={() => setMessageTo(user)}
              >
                <Avatar url={user.avatar.url} size="mid" />
                {user.online.status && <span className="user-online-status" />}
                <div className="Messages__left__list-item__info">
                  <h2>{user.userName}</h2>
                  {!user.online.status && (
                    <h3>
                      {formatTime(user.online.lastLoggedOut.seconds * 1000)}
                    </h3>
                  )}
                </div>
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
