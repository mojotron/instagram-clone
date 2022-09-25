import { render, screen } from '../../../test-utils/testing-library-utils';
import Login from '../Login';
import userEvent from '@testing-library/user-event';
import { useLogin } from '../../../hooks/useLogin';

jest.mock('../../../hooks/useLogin', () => ({
  useLogin: jest.fn(() => ({
    isPending: false,
    error: null,
    login: jest.fn(),
  })),
}));

describe('Login page', () => {
  test('initial render', () => {
    useLogin.mockImplementation(() => ({
      isPending: false,
      error: null,
      login: jest.fn(),
    }));
    render(<Login />);
    const headingElement = screen.getByRole('heading', {
      name: /instagram clone/i,
    });
    expect(headingElement).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /forgot password/i })
    ).toHaveAttribute('href', '/login/reset');
  });

  test('email input', async () => {
    useLogin.mockImplementation(() => ({
      isPending: false,
      error: null,
      login: jest.fn(),
    }));
    render(<Login />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toHaveValue('');
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('password input', async () => {
    useLogin.mockImplementation(() => ({
      isPending: false,
      error: null,
      login: jest.fn(),
    }));
    render(<Login />);
    const user = userEvent.setup();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveValue('');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'test@example.com');
    expect(passwordInput).toHaveValue('test@example.com');
  });

  test('login button', async () => {
    useLogin.mockImplementation(() => ({
      isPending: false,
      error: null,
      login: jest.fn(),
    }));
    render(<Login />);
    const user = userEvent.setup();
    const loginBtn = screen.getByRole('button', { name: /log in/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    // btn is disabled until character is entered in email field and pass field have 8 characters
    expect(loginBtn).toBeInTheDocument();
    await user.clear(emailInput);
    await user.type(emailInput, 't');
    expect(loginBtn).toBeDisabled();
    await user.clear(passwordInput);
    await user.type(passwordInput, '01234567');
    expect(loginBtn).toBeEnabled();
    await user.clear(emailInput);
    expect(loginBtn).toBeDisabled();
  });

  test('firestore pending', async () => {
    useLogin.mockImplementation(() => ({
      isPending: true,
      error: null,
      login: jest.fn(),
    }));
    render(<Login />);
    expect(
      screen.getByRole('button', { name: /loading/i })
    ).toBeInTheDocument();
  });

  test('firestore error', async () => {
    useLogin.mockImplementation(() => ({
      isPending: false,
      error: 'something broke',
      signup: jest.fn(),
    }));
    render(<Login />);
    // expect error
    expect(await screen.findByText('something broke')).toBeInTheDocument();
  });
});
