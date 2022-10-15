import { useContext } from 'react';
import { UserPostContext } from '../context/UserPostContext';

export const useUserPostContext = () => {
  const context = useContext(UserPostContext);
  if (!context)
    throw new Error(
      'useUserPostContext must be used inside an UserPostContextProvider'
    );
  return context;
};
