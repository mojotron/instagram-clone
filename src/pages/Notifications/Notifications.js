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
          <Notification
            data={{
              userId: 'AOrJ4zBfL98UazG2SBlv',
              postId: '6n5FOVcQK3MRrhDF7eTF',
              content: `Homemade pumpkin latte with @rusty_trails , traditional for Halloween 👻 🎃
            .
            .
            .
            #Halloween #pumpkin #pumpkinlatte #samhain #coffee #pumpkincarving`,
              createdAt: new Date(),
            }}
          />
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
