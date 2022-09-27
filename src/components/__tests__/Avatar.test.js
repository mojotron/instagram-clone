import { render, screen } from '../../test-utils/testing-library-utils';
import Avatar from '../Avatar';

describe('Avatar component', () => {
  test('renders size', () => {
    render(<Avatar url={null} size="small" />);
    expect(screen.getByTestId('avatar')).toHaveClass('Avatar--small');
  });
  test('renders default img', () => {
    render(<Avatar url={null} size="small" />);
    expect(screen.getByAltText(/default avatar/i)).toBeInTheDocument();
  });
});
