import { render, screen } from '@testing-library/react';
import Settings from '../Settings';

const mockUserData = {
  userName: '_jd_',
  fullName: 'John Dow',
  emailAddress: 'johndow@example.com',
  avatarUrl: '',
  bio: '',
  website: '',
};

describe('Settings page, update user info', () => {
  test('initial render', () => {
    render(<Settings userData={mockUserData} />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    // TODO Avatar email password
  });
  test.skip('display input value for non empty data field', async () => {
    render(<Settings userData={mockUserData} />);
    const nameField = screen.getByLabelText(/name/i);
  });
});
