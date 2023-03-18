// hooks
import { useState, useMemo, useEffect } from 'react';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useCollectDocsByIdList } from '../../hooks/useCollectDocsByIdList';
import { useScreenSizeContext } from '../../hooks/useScreenSizeContext';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { response } = useUserDataContext();
  const { screenSize } = useScreenSizeContext();

  const [showNewMessage, setShowNewMessage] = useState(false);
  const [messageTo, setMessageTo] = useState(null);

  const messagesList = useMemo(() => {
    return response.document.messages.map(msg => msg.messageTo);
  }, [response.document.messages]);

  const { documents } = useCollectDocsByIdList(messagesList, 'users');

  useEffect(() => {
    if (location.state === null) return;
    setMessageTo(location.state.messageTo);
  }, [location]);

  return (
    <div
      className="Messages"
      style={
        screenSize === 'small'
          ? { flexDirection: 'column', height: '1000px', overflowY: 'scroll' }
          : { flexDirection: 'row' }
      }
    >
      {showNewMessage && (
        <NewMessage
          setShowNewMessage={setShowNewMessage}
          setMessageTo={setMessageTo}
        />
      )}
      <div
        className="Messages__left"
        style={
          screenSize === 'small'
            ? {
                width: '100%',
                height: '250px',
                overflowY: 'scroll',
                borderBottom: 'var(--gray-border)',
              }
            : { width: '40%', borderRight: ' var(--gray-border)' }
        }
      >
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
      <div
        className="Messages__right"
        style={
          screenSize === 'small'
            ? {
                width: '100%',
                height: '750px',
                overflowY: 'scroll',
              }
            : { width: '60%' }
        }
      >
        {messageTo && <MessageMainBody messageTo={messageTo} />}
      </div>
    </div>
  );
};

export default Messages;
