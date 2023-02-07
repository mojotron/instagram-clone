// hooks
import { useMemo } from 'react';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
import { useCollectDocsByIdList } from '../../hooks/useCollectDocsByIdList';
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
  // filter notification
  const filterIDs = useMemo(() => {
    console.log('memo');
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
    <div className="Notifications">
      <h2>Notifications</h2>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {document && (
        <section>
          {document.notifications.reverse().map(note => (
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
