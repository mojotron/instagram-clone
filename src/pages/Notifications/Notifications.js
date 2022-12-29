import React from 'react';
import { useCollectNotifications } from '../../hooks/useCollectNotifications';
import { useNotifications } from '../../hooks/useNotifications';
import Notification from './components/Notification';
// styles
import './styles/Notifications.css';

const Notifications = () => {
  const { updateNotifications } = useNotifications();
  const { document } = useCollectNotifications();

  console.log('notifi doc', document);

  return (
    <div className="Notifications">
      <h2>Notifications</h2>
      {document && (
        <section>
          {document.notifications.map(note => (
            <Notification
              data={{
                fromUserId: note.fromUserId,
                postId: note.postUserId,
                createdAt: note.createdAt,
                content: note.content,
              }}
            />
          ))}
        </section>
      )}
      <button
        onClick={() =>
          updateNotifications('3O14T4slCa8lsmEbWKd7', {
            notifications: [...document.notifications, 'hello world'],
          })
        }
      >
        Test notification
      </button>
    </div>
  );
};

export default Notifications;
