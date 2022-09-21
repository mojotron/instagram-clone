import { render, screen } from '@testing-library/react';
import AuthLink from '../AuthLink';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('AuthLink component', () => {
  test('link to signup page', () => {
    render(<AuthLink goto="signup" />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const headingElement = screen.getByRole('heading', {
      name: /don't have an account/i,
    });
    expect(headingElement).toBeInTheDocument();
    const linkElement = screen.getByRole('link', { name: /sign up/i });
    expect(linkElement).toHaveAttribute('href', '/signup');
  });

  test('link to login page', () => {
    render(<AuthLink goto="login" />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const headingElement = screen.getByRole('heading', {
      name: /have an account/i,
    });
    expect(headingElement).toBeInTheDocument();
    const linkElement = screen.getByRole('link', { name: /log in/i });
    expect(linkElement).toHaveAttribute('href', '/login');
  });
});
