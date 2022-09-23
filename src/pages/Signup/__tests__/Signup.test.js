import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Signup from '../Signup';

import { useSignup } from '../../../hooks/useSignup';

jest.mock('../../../hooks/useSignup', () => ({
  useSignup: jest.fn(() => ({
    isPending: false,
    error: null,
    signup: jest.fn(),
  })),
}));

describe('Signup page', () => {
  test('renders title and subtitle', async () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const title = screen.getByRole('heading', { name: /instagram clone/i });
    expect(title).toBeInTheDocument();
    const subTitle = screen.getByRole('heading', {
      name: /Sign up to see photos and videos from your friends/i,
    });
    expect(subTitle).toBeInTheDocument();
  });

  test('input field email', async () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument('');
  });

  test('input field full name', async () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const fullNameInput = screen.getByPlaceholderText(/full name/i);
    expect(fullNameInput).toBeInTheDocument('');
  });

  test('input field username', async () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    expect(usernameInput).toBeInTheDocument('');
  });

  test('input field password', async () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument('');
  });

  test('renders terms and conditions paragraphs', () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const terms1 = screen.getByText(/by signing/i);
    const terms2 = screen.getByText(/please use dummy data/i);
    expect(terms1).toBeInTheDocument();
    expect(terms2).toBeInTheDocument();
  });

  test('terms of condition', async () => {
    useSignup.mockImplementation(() => ({
      isPending: false,
      error: null,
      signup: jest.fn(),
    }));
    render(<Signup />);
    const user = userEvent.setup();
    const termsCheckbox = screen.getByRole('checkbox');
    const signupBtn = screen.getByRole('button', { name: /sign up/i });
    expect(termsCheckbox).not.toBeChecked();
    expect(signupBtn).toBeDisabled();
    await user.click(termsCheckbox);
    expect(termsCheckbox).toBeChecked();
    expect(signupBtn).toBeEnabled();
  });

  describe('happy path', () => {
    test('all inputs are valid', async () => {
      useSignup.mockImplementation(() => ({
        isPending: false,
        error: null,
        signup: jest.fn(),
      }));
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
      // change firebase state on submit
      // signup button change text on submit
      useSignup.mockImplementation(() => ({
        isPending: true,
        error: null,
        signup: jest.fn(),
      }));
      const termsCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button');
      expect(submitButton).toHaveTextContent('Sign up');
      await user.click(termsCheckbox);
      await user.click(submitButton);
      expect(submitButton).toHaveTextContent('Loading');
    });
  });

  describe('errors', () => {
    test('2 inputs are invalid', async () => {
      useSignup.mockImplementation(() => ({
        isPending: false,
        error: null,
        signup: jest.fn(),
      }));
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

    test('firebase throw error', async () => {
      useSignup.mockImplementation(() => ({
        isPending: false,
        error: 'something broke',
        signup: jest.fn(),
      }));
      render(<Signup />);
      // expect error
      expect(await screen.findByText('something broke')).toBeInTheDocument();
    });
  });
});
