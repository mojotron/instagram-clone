import { render } from '@testing-library/react';
import { AuthContextProvider } from '../context/AuthContext';

// mock on onAuthStateChanged
jest.mock('firebase/auth', () => {
  return {
    getAuth: () => jest.fn(),
    onAuthStateChanged: () => jest.fn(),
  };
});

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider value={{ authIsReady: true, user: true }}>
      {children}
    </AuthContextProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: ContextProvider, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
