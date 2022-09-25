import { render, screen } from '../../../test-utils/testing-library-utils';
import ForgotPassword from '../ForgotPassword';
import userEvent from '@testing-library/user-event';

import { usePasswordReset } from '../../../hooks/usePasswordReset';

jest.mock('../../../hooks/usePasswordReset', () => ({
  usePasswordReset: jest.fn(() => ({
    isPending: false,
    error: null,
    passwordReset: jest.fn(),
  })),
}));

describe('ForgotPassword form', () => {
  test('initial render', () => {
    usePasswordReset.mockImplementation(() => ({
      isPending: false,
      error: null,
      passwordReset: jest.fn(),
    }));
    render(<ForgotPassword />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'closed lock');
    expect(
      screen.getByRole('heading', { name: /trouble logging in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /enter your email/i })
    ).toBeInTheDocument();
  });

  test('links', () => {
    usePasswordReset.mockImplementation(() => ({
      isPending: false,
      error: null,
      passwordReset: jest.fn(),
    }));
    render(<ForgotPassword />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements[0]).toHaveAttribute('href', '/signup');
    expect(linkElements[1]).toHaveAttribute('href', '/login');
  });

  test('button disabled', async () => {
    usePasswordReset.mockImplementation(() => ({
      isPending: false,
      error: null,
      passwordReset: jest.fn(),
    }));
    render(<ForgotPassword />);
    const user = userEvent.setup();
    const submitBtn = screen.getByRole('button', { name: /send login link/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    expect(submitBtn).toBeDisabled();
    await user.clear(inputEmail);
    await user.type(inputEmail, 'test@');
    expect(submitBtn).toBeDisabled();
    await user.clear(inputEmail);
    await user.type(inputEmail, 'test@example.com');
    expect(submitBtn).toBeEnabled();
  });

  test('pending and error', () => {
    usePasswordReset.mockImplementation(() => ({
      isPending: true,
      error: 'something wrong',
      passwordReset: jest.fn(),
    }));
    render(<ForgotPassword />);
    expect(screen.getByRole('button')).toHaveTextContent('Loading');
    expect(screen.getByText('something wrong')).toHaveAttribute(
      'class',
      'auth-error'
    );
  });
});
