import { render, screen } from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';
import mockUserData from '../../../../mocks/userData.json';

describe('Navbar component', () => {
  test('toggle ProfileDropdown', async () => {
    render(<Navbar userData={mockUserData} toggleShowCreatePost={jest.fn()} />);
    const user = userEvent.setup();
    const userAvatar = screen.getByTestId('avatar');
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    await user.click(userAvatar);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    await user.click(userAvatar);
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });
});
