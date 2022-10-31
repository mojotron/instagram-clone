import { createContext } from 'react';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  return <UserDataContext.Provider>{children}</UserDataContext.Provider>;
};
