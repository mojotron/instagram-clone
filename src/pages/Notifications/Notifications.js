// hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
// components
import Notification from './components/Notification';
// styles
import './styles/Notifications.css';

const Notifications = () => {
  const { response } = useUserDataContext();
  const { isPending, error, document } = useOnSnapshotDocument(
    'notifications',
    response.document.id
  );

  console.log('notification');
  console.log(document);

  // delete notification
  // new notification mark
  // filter server calls
  // - check all users
  // - check all posts

  return (
    <div className="Notifications">
      <h2>Notifications</h2>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {document && (
        <section>
          {document.notifications.map(note => (
            <Notification
              key={note.createdAt.seconds}
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
