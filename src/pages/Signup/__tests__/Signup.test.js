import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '../Signup';

describe('Signup page', () => {
  test('renders title and subtitle', () => {
    render(<Signup />);
    const title = screen.getByRole('heading', { name: /instagram clone/i });
    expect(title).toBeInTheDocument();
    const subTitle = screen.getByRole('heading', {
      name: /Sign up to see photos and videos from your friends/i,
    });
    expect(subTitle).toBeInTheDocument();
  });

  test('input field email', async () => {
    render(<Signup />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toHaveValue('');
    await user.clear(emailInput);
    await user.type(emailInput, 'temp@example.com');
    expect(emailInput).toHaveValue('temp@example.com');
  });

  test('input field full name', async () => {
    render(<Signup />);
    const user = userEvent.setup();
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    expect(fullNameInput).toHaveValue('');
    await user.clear(fullNameInput);
    await user.type(fullNameInput, 'Neo Anderson');
    expect(fullNameInput).toHaveValue('Neo Anderson');
  });

  test('input field username', async () => {
    render(<Signup />);
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText(/username/i);
    expect(usernameInput).toHaveValue('');
    await user.clear(usernameInput);
    await user.type(usernameInput, 'Neo Anderson');
    expect(usernameInput).toHaveValue('Neo Anderson');
  });

  test('input field password', async () => {
    render(<Signup />);
    const user = userEvent.setup();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveValue('');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'abcdef');
    expect(passwordInput).toHaveValue('abcdef');
  });

  test('terms of condition', async () => {
    render(<Signup />);
    const user = userEvent.setup();
    const termsCheckbox = screen.getByRole('checkbox');
    const signupBtn = screen.getByRole('button', { name: /signup/i });
    expect(termsCheckbox).not.toBeChecked();
    expect(signupBtn).toBeDisabled();
    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    expect(signupBtn).toBeEnabled();
  });

  // test('submit/create user', () => {});
  // add tests for input check up protect form bad users
  // error
});
