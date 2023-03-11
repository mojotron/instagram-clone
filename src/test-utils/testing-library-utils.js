import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';
import { UserDataContextProvider } from '../context/UserDataContext';
import { ScreenSizeContextProvider } from '../context/ScreenSizeContext';
import { onAuthStateChanged } from 'firebase/auth';

// mock on onAuthStateChanged
const temp = jest.fn(() => true);

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
  };
});

jest.mock('../hooks/useOnSnapshotDocument.js', () => {
  return {
    document: { uid: '12345' },
    isPending: false,
    error: null,
  };
});

const ContextProvider = ({ children }) => {
  onAuthStateChanged.mockImplementation(() => temp);
  return (
    <AuthContextProvider value={{ authIsReady: true, user: { uid: '12345' } }}>
      <ScreenSizeContextProvider
        value={{
          screenSize: 'small',
          fixedSize: 'null',
          setFixedSize: jest.fn(),
        }}
      >
        <UserDataContextProvider
          value={{
            response: {
              document: { uid: '12345' },
              isPending: false,
              error: null,
            },
            modals: [],
            closeModals: jest.fn(),
            toggleModal: jest.fn(),
            navigationTab: 'home',
            setNavigationTab: jest.fn(),
          }}
        >
          <BrowserRouter>{children}</BrowserRouter>
        </UserDataContextProvider>
      </ScreenSizeContextProvider>
    </AuthContextProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ContextProvider,
    ...options,
  });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
