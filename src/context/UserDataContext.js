import { createContext } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { document, isPending, error } = useOnSnapshotDocument(
    'users',
    user.uid
  );
  const { updateDocument } = useFirestore('users');

  const updateStatus = useRef((docId, data) =>
    updateDocument(docId, data)
  ).current;

  useEffect(() => {
    if (document === null) return;
    if (document.online.status) return;

    const changeOnlineStatus = async () => {
      updateStatus(document.id, {
        online: {
          status: true,
          lastLoggedOut: Timestamp.fromDate(new Date()),
        },
      });
    };

    changeOnlineStatus();
  }, [document, updateStatus]);

  if (!document?.online.status) return;

  return (
    <UserDataContext.Provider
      value={{ response: { document, isPending, error } }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
