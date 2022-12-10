import { useState } from 'react';
// components
import NewMessage from './components/NewMessage';
import MessagesHeader from './components/MessagesHeader';
import './styles/Messages.css';

const Messages = () => {
  const [showNewMessage, setShowNewMessage] = useState(false);

  return (
    <div className="Messages">
      {showNewMessage && <NewMessage setShowNewMessage={setShowNewMessage} />}
      <div className="Messages__left">
        <MessagesHeader setShowNewMessage={setShowNewMessage} />
        <section></section>
      </div>
      <div className="Messages__right">message</div>
    </div>
  );
};

export default Messages;
