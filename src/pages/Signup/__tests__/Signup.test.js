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
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument('');
  });

  test('input field full name', async () => {
    render(<Signup />);
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    expect(fullNameInput).toBeInTheDocument('');
  });

  test('input field username', async () => {
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    expect(usernameInput).toBeInTheDocument('');
  });

  test('input field password', async () => {
    render(<Signup />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument('');
  });

  test('renders terms and conditions paragraphs', () => {
    render(<Signup />);
    const terms1 = screen.getByText(/by signing/i);
    const terms2 = screen.getByText(/please use dummy data/i);
    expect(terms1).toBeInTheDocument();
    expect(terms2).toBeInTheDocument();
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

  describe('happy path, all valid inputs', () => {
    test('all inputs are valid', async () => {
      render(<Signup />);
      const user = userEvent.setup();
      const emailInput = screen.getByPlaceholderText(/email/i);
      const fullNameInput = screen.getByPlaceholderText(/full name/i);
      const usernameInput = screen.getByPlaceholderText(/username/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      await user.clear(emailInput);
      await user.type(emailInput, 'test@example.com');
      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'John Dow');
      await user.clear(usernameInput);
      await user.type(usernameInput, '_jd_');
      await user.clear(passwordInput);
      await user.type(passwordInput, 'abc1ABC!');
      const checkIcons = screen.getAllByAltText('valid input');
      expect(checkIcons).toHaveLength(4);
    });
  });

  describe('2 invalid inputs two valid', () => {
    test('all inputs are valid', async () => {
      render(<Signup />);
      const user = userEvent.setup();
      const emailInput = screen.getByPlaceholderText(/email/i);
      const fullNameInput = screen.getByPlaceholderText(/full name/i);
      const usernameInput = screen.getByPlaceholderText(/username/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      await user.clear(emailInput);
      await user.type(emailInput, 'test@example.com');
      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'John');
      await user.clear(usernameInput);
      await user.type(usernameInput, '_jd_');
      await user.clear(passwordInput);
      await user.type(passwordInput, 'abc1ABC');
      const checkIcons = screen.getAllByAltText('valid input');
      expect(checkIcons).toHaveLength(2);
      const errorIcons = screen.getAllByAltText('invalid input');
      expect(errorIcons).toHaveLength(2);
      expect(
        screen.getByText('input full name, like "John Dow"')
      ).toBeInTheDocument();
      expect(
        screen.getByText('a special character #?!@$%^&*-')
      ).toBeInTheDocument();
    });
  });
});
