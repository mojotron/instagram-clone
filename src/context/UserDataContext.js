import { createContext } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { document, isPending, error } = useOnSnapshotDocument(
    'users',
    user.uid
  );

  if (!document?.online.status) return;

  return (
    <UserDataContext.Provider
      value={{ response: { document, isPending, error } }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
