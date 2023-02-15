// hooks
import { useState, useMemo } from 'react';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useCollectDocsByIdList } from '../../hooks/useCollectDocsByIdList';
// components
import NewMessage from './components/NewMessage';
import MessagesHeader from './components/MessagesHeader';
import MessageMainBody from './components/MessageMainBody';
import Avatar from '../../components/Avatar';
// style
import './styles/Messages.css';
// utils
import { formatTime } from '../../utils/formatTime';

const Messages = () => {
  const { response } = useUserDataContext();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [messageTo, setMessageTo] = useState(null);

  const messagesList = useMemo(() => {
    console.log('msg memo');
    return response.document.messages.map(msg => msg.messageTo);
  }, [response.document.messages]);

  const { documents } = useCollectDocsByIdList(messagesList, 'users');

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
                onClick={() => setMessageTo(user.id)}
              >
                <Avatar url={user.avatar.url} size={35} />
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
        {messageTo && <MessageMainBody messageTo={messageTo} />}
      </div>
    </div>
  );
};

export default Messages;
