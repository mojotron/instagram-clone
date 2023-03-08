import { render, screen } from '../../test-utils/testing-library-utils';
import Avatar from '../Avatar';
import userEvent from '@testing-library/user-event';

describe('Avatar component', () => {
  test('renders size', () => {
    render(<Avatar url={null} size={25} />);
    expect(screen.getByTestId('avatar')).toHaveAttribute(
      'style',
      'width: 25px; height: 25px;'
    );
  });
  test('renders default img', () => {
    render(<Avatar url={null} size={25} />);
    expect(screen.getByAltText(/default avatar/i)).toBeInTheDocument();
  });
  test('renders image with argument url', () => {
    render(<Avatar url={'images/test.png'} size={25} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'images/test.png');
  });
  test('calls handleClick argument', async () => {
    const clickHandler = jest.fn();
    render(<Avatar url={null} size={25} handleClick={clickHandler} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('img'));
    expect(clickHandler).toBeCalledTimes(1);
  });
});
