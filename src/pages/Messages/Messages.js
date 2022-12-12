import { useState } from 'react';
// components
import NewMessage from './components/NewMessage';
import MessagesHeader from './components/MessagesHeader';
import MessageMainBody from './components/MessageMainBody';
// style
import './styles/Messages.css';

const Messages = () => {
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [messageTo, setMessageTo] = useState(null);

  console.log('message to', messageTo?.userName);

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
        <section></section>
      </div>
      <div className="Messages__right">
        {messageTo && <MessageMainBody user={messageTo} />}
      </div>
    </div>
  );
};

export default Messages;
