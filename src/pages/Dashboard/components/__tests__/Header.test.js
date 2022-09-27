import { render, screen } from '../../../../test-utils/testing-library-utils';
import Header from '../Header';

describe('Dashboard Header component', () => {
  test('renders heading/logo', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { name: /instagram clone/i })
    ).toBeInTheDocument();
  });
});
