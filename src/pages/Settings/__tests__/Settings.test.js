import { render, screen } from '@testing-library/react';
import Settings from '../Settings';
import userEvent from '@testing-library/user-event';
import { useFirestore } from '../../../hooks/useFirestore';

jest.mock('../../../hooks/useFirestore', () => ({
  useFirestore: jest.fn(() => ({
    isPending: false,
    error: null,
    checkIfUserExists: jest.fn(),
    updateDocument: jest.fn(),
  })),
}));

const mockUserData = {
  userName: '_jd_',
  fullName: 'John Dow',
  emailAddress: 'johndow@example.com',
  avatar: { url: '', fileName: '' },
  bio: '',
  website: '',
};

describe('Settings page, update user info', () => {
  test('happy path', async () => {
    useFirestore.mockImplementation(() => ({
      isPending: false,
      error: null,
      checkIfUserExists: jest.fn(),
      updateDocument: jest.fn(),
    }));
    render(<Settings userData={mockUserData} />);
    const fullNameInput = screen.getByLabelText(/^name/i);
    const userNameInput = screen.getByLabelText(/username/i);
    const websiteInput = screen.getByLabelText(/Website/i);
    const bioTextbox = screen.getByLabelText(/Bio/i);
    const charCounter = screen.getByTestId('char-counter');
  });
});
