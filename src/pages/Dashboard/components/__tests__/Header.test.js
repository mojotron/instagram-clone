import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Dashboard Header component', () => {
  test('renders heading/logo', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: /instagram clone/i })
    ).toBeInTheDocument();
  });
});
