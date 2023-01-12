import { createContext } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const ScreenSizeContext = createContext();

export const ScreenSizeContextProvider = ({ children }) => {
  const small = useMediaQuery('(max-width: 770px)');
  const large = useMediaQuery('(min-width: 1280px)');

  const determineScreenSize = () => {
    if (small) return 'small';
    if (large) return 'large';
    return 'medium';
  };

  const screenSize = determineScreenSize();

  return (
    <ScreenSizeContext.Provider value={{ screenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
