import { useContext } from 'react';
import { SuggestedUserContext } from '../context/SuggestedUserContext';

export const useSuggestedUsersContext = () => {
  const context = useContext(SuggestedUserContext);
  if (!context)
    throw new Error(
      'useSuggestedUserContext must be used inside a SuggestedUserContextProvider'
    );
  return context;
};
