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

  test('input field email', () => {});
  test('input full name email', () => {});
  test('input username email', () => {});
  test('input password email', () => {});
  test('terms of condition', () => {});
  test('submit/create user', () => {});
});
