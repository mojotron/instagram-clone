import { render } from '@testing-library/react';
import { UserPostContextProvider } from '../context/UserPostContext';

const ContextProvider = ({ children }) => {
  return <UserPostContextProvider>{children}</UserPostContextProvider>;
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: ContextProvider, ...options });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
