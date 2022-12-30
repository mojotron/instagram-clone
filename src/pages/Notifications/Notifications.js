import React from 'react';
// components
import Notification from './components/Notification';
// hooks
import { useCollectNotifications } from '../../hooks/useCollectNotifications';
// styles
import './styles/Notifications.css';

const Notifications = () => {
  const { document } = useCollectNotifications();

  return (
    <div className="Notifications">
      <h2>Notifications</h2>
      {document && (
        <section>
          {document.notifications.map(note => (
            <Notification
              key={note.createdAt.milliseconds}
              data={{
                fromUserId: note.fromUserId,
                postId: note.post,
                createdAt: note.createdAt,
                content: note.content,
              }}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default Notifications;
