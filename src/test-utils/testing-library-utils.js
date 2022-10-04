import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

// mock on onAuthStateChanged
const temp = jest.fn(() => true);
jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
  };
});

const ContextProvider = ({ children }) => {
  onAuthStateChanged.mockImplementation(() => temp);
  return (
    <AuthContextProvider value={{ authIsReady: true, user: { uid: 1 } }}>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthContextProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: ContextProvider, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
