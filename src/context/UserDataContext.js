import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { useScreenSizeContext } from '../hooks/useScreenSizeContext';

export const UserDataContext = createContext();

const initialModalState = {
  openNotifications: false,
  openSearch: false,
  openMoreOptions: false,
  openCreatePost: false,
};

export const UserDataContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { screenSize, setFixedSize, fixedSize } = useScreenSizeContext();
  const { document, isPending, error } = useOnSnapshotDocument(
    'users',
    user.uid
  );
  // modals
  const [modals, setModals] = useState({ ...initialModalState });
  // close all modals
  const closeModals = useCallback(() => {
    setModals({ ...initialModalState });
    setFixedSize(null);
  }, [setFixedSize]);

  useEffect(() => {
    if (screenSize !== 'large') return;
    if (modals.openSearch || modals.openNotifications) setFixedSize('medium');
    if (!modals.openSearch && !modals.openNotifications && fixedSize)
      setFixedSize(null);
  }, [
    modals.openSearch,
    modals.openNotifications,
    screenSize,
    setFixedSize,
    fixedSize,
  ]);

  const toggleModal = useCallback((event, modalName) => {
    if (event !== null) event.stopPropagation();
    // check for notifcation/search => is is open and screens size grater then small set to fix size to midium
    setModals(oldValue => ({
      ...initialModalState,
      [modalName]: !oldValue[modalName],
    }));
  }, []);
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

  // navigation tab (values => home, explore, messages, profile)
  const [navigationTab, setNavigationTab] = useState('home');

  if (!document?.online.status) return;

  return (
    <UserDataContext.Provider
      value={{
        response: { document, isPending, error },
        modals,
        closeModals,
        toggleModal,
        navigationTab,
        setNavigationTab,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
