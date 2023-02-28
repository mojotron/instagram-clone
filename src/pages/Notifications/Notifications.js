// hooks
import { useEffect, useMemo } from 'react';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { useCollectDocsByIdList } from '../../hooks/useCollectDocsByIdList';
import { useNotifications } from '../../hooks/useNotifications';
import { useScreenSizeContext } from '../../hooks/useScreenSizeContext';
// components
import Notification from './components/Notification';
// styles
import './styles/Notifications.css';
// icons
import { IoIosArrowBack } from 'react-icons/io';

const Notifications = ({ toggleNotifications }) => {
  const { response } = useUserDataContext();
  const { isPending, error, document } = useOnSnapshotDocument(
    'notifications',
    response.document.id
  );
  const { screenSize } = useScreenSizeContext();
  const { toggleNewNotificationOff } = useNotifications();
  // check if user have new notification, if does change status to false
  useEffect(() => {
    if (response.document.newNotification === false) return;
    toggleNewNotificationOff();
  }, [response.document.newNotification, toggleNewNotificationOff]);

  // filter notification
  const filterIDs = useMemo(() => {
    if (!document) return { usersIds: null, postIds: null };

    const collection = { usersIds: [], postIds: [] };
    document.notifications.forEach(note => {
      if (note.fromUserId) collection.usersIds.push(note.fromUserId);
      if (note.post) collection.postIds.push(note.post);
    });
    return {
      usersIds: [...new Set(collection.usersIds)],
      postIds: [...new Set(collection.postIds)],
    };
  }, [document]);
  // collect documents
  const { documents: userDocs } = useCollectDocsByIdList(
    filterIDs.usersIds,
    'users'
  );
  const { documents: postDocs } = useCollectDocsByIdList(
    filterIDs.postIds,
    'posts'
  );

  if (userDocs === null || postDocs === null) return;

  return (
    <div
      className={`Notifications${
        screenSize === 'small' ? ' Notifications--full-width' : ''
      }`}
    >
      <header className="Notifications__header">
        {screenSize === 'small' && (
          <button className="btn" onClick={toggleNotifications}>
            <IoIosArrowBack size={25} />
          </button>
        )}
        <h2>Notifications</h2>
      </header>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {document && (
        <section>
          {document.notifications.map(note => (
            <Notification
              key={note.createdAt.seconds}
              data={note}
              fromUser={userDocs.find(user => user.id === note.fromUserId)}
              post={postDocs.find(post => post.id === note.post)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default Notifications;
