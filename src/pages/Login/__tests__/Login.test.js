import { render, screen } from '@testing-library/react';
import Login from '../Login';
import userEvent from '@testing-library/user-event';

describe('Login page', () => {
  test('initial render', () => {
    render(<Login />);
    const headingElement = screen.getByRole('heading', {
      name: /instagram clone/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('email input', async () => {
    render(<Login />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toHaveValue('');
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('password input', async () => {
    render(<Login />);
    const user = userEvent.setup();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveValue('');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'test@example.com');
    expect(passwordInput).toHaveValue('test@example.com');
  });

  test('login button', async () => {
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
});
