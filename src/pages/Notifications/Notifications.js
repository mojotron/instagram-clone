import React from 'react';
import Notification from './components/Notification';
// styles
import './styles/Notifications.css';

const Notifications = () => {
  return (
    <div className="Notifications">
      <h2>Notifications</h2>
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
    </div>
  );
};

export default Notifications;
