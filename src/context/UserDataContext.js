import { createContext } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useRef } from 'react';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { response, getDocument, updateDocument, checkIfUserExists } =
    useFirestore('users');

  const loadDocument = useRef(() => getDocument(user.uid)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  return (
    <UserDataContext.Provider
      value={{ response, updateDocument, checkIfUserExists }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
