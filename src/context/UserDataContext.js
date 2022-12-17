import { createContext } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';
import { Timestamp } from 'firebase/firestore';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { response, getDocument, updateDocument, checkIfUserExists } =
    useFirestore('users');

  const loadDocument = useRef(() => getDocument(user.uid)).current;
  const updateStatus = useRef((docId, data) =>
    updateDocument(docId, data)
  ).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  useEffect(() => {
    if (response.document === null) return;
    if (response.document.online.status) return;

    const changeOnlineStatus = async () => {
      updateStatus(response.document.id, {
        online: {
          status: true,
          lastLoggedOut: Timestamp.fromDate(new Date()),
        },
      });
    };

    changeOnlineStatus();
  }, [response, updateStatus]);

  if (!response.document?.online.status) return;

  return (
    <UserDataContext.Provider
      value={{ response, updateDocument, checkIfUserExists }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
