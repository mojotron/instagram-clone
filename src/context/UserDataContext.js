import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { useScreenSizeContext } from '../hooks/useScreenSizeContext';

export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { screenSize, setFixedSize } = useScreenSizeContext();
  const { document, isPending, error } = useOnSnapshotDocument(
    'users',
    user.uid
  );
  // TEST close modals
  const [modals, setModals] = useState({
    openNotifications: false,
    openSearch: false,
    openMoreOptions: false,
  });
  // close all modals
  const closeModals = useCallback(() => {
    setModals({
      openNotifications: false,
      openSearch: false,
      openMoreOptions: false,
    });
    setFixedSize(null);
  }, [setFixedSize]);

  const toggleModal = useCallback(
    (event, modalName) => {
      if (event !== null) event.stopPropagation();
      // check for notifcation/search => is is open and screens sieze grater then small set to fix size to midium
      let openFlag = false;
      setModals(oldValue => {
        if (modalName === 'openNotifications' || modalName === 'openSearch') {
          openFlag = !oldValue[modalName];
        }
        const newValue = {
          openNotifications: false,
          openSearch: false,
          openMoreOptions: false,
        };
        return { ...newValue, [modalName]: !oldValue[modalName] };
      });
      openFlag && screenSize === 'large'
        ? setFixedSize('medium')
        : setFixedSize(null);
    },
    [screenSize, setFixedSize]
  );
  //
  useEffect(() => {
    const closeModalsOnEscape = e => {
      if (e.key === 'Escape') {
        closeModals();
      }
    };
    window.addEventListener('keydown', closeModalsOnEscape);
    return () => window.removeEventListener('keydown', closeModalsOnEscape);
  }, [closeModals]);

  if (!document?.online.status) return;

  return (
    <UserDataContext.Provider
      value={{
        response: { document, isPending, error },
        modals,
        closeModals,
        toggleModal,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
