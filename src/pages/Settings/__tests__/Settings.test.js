import { render, screen } from '../../../test-utils/testing-library-utils';
import Settings from '../Settings';
import userEvent from '@testing-library/user-event';
import { useFirestore } from '../../../hooks/useFirestore';
import mockUserData from '../../../mocks/userData.json';

jest.mock('../../../hooks/useFirestore', () => ({
  useFirestore: jest.fn(() => ({
    isPending: false,
    error: null,
    checkIfUserExists: jest.fn(),
    updateDocument: jest.fn(),
  })),
}));

describe('Settings page, update user info', () => {
  test('happy path', async () => {
    const mockUpdateDoc = jest.fn();
    useFirestore.mockImplementation(() => ({
      isPending: false,
      error: null,
      checkIfUserExists: jest.fn(),
      updateDocument: mockUpdateDoc,
    }));
    const user = userEvent.setup();
    render(<Settings userData={mockUserData} />);
    const fullNameInput = screen.getByLabelText(/^name/i);
    const userNameInput = screen.getByLabelText(/username/i);
    const websiteInput = screen.getByLabelText(/Website/i);
    const bioTextbox = screen.getByLabelText(/Bio/i);
    const charCounter = screen.getByTestId('char-counter');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();

    expect(fullNameInput).toHaveValue('John Dow');
    await user.clear(fullNameInput);
    await user.type(fullNameInput, 'Neo Anderson');
    expect(fullNameInput).toHaveValue('Neo Anderson');

    expect(userNameInput).toHaveValue('_jd_');
    await user.clear(userNameInput);
    await user.type(userNameInput, '_Neo_');
    expect(userNameInput).toHaveValue('_Neo_');

    expect(websiteInput).toHaveValue('');
    await user.clear(websiteInput);
    await user.type(websiteInput, 'www.neo.com');
    expect(websiteInput).toHaveValue('www.neo.com');

    expect(bioTextbox).toHaveValue('');
    expect(charCounter).toHaveTextContent('0/150');
    await user.clear(bioTextbox);
    await user.type(bioTextbox, 'I know kung fu!');
    expect(bioTextbox).toHaveValue('I know kung fu!');
    expect(charCounter).toHaveTextContent('15/150');

    expect(submitButton).toBeEnabled();
    await user.click(submitButton);
    expect(mockUpdateDoc).toBeCalledTimes(1);
  });

  test('invalid username', async () => {
    // return from server that name exist
    const mockCheckIfUserExists = jest.fn(() => true);
    const mockUpdateDoc = jest.fn();
    useFirestore.mockImplementation(() => ({
      isPending: false,
      error: null,
      checkIfUserExists: mockCheckIfUserExists,
      updateDocument: mockUpdateDoc,
    }));
    const user = userEvent.setup();
    render(<Settings userData={mockUserData} />);
    const userNameInput = screen.getByLabelText(/username/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // user name is to short
    await user.clear(userNameInput);
    await user.type(userNameInput, 'Neo');
    await user.click(submitButton);
    expect(screen.getByText('minimum 4 characters')).toBeInTheDocument();
    await user.clear(userNameInput);
    await user.type(userNameInput, 'Neon');
    await user.click(submitButton);
    expect(mockCheckIfUserExists).toBeCalledTimes(1);
    expect(screen.getByText(/username already exist/i)).toBeInTheDocument();
    expect(mockUpdateDoc).toBeCalledTimes(0);
  });

  test('invalid full name', async () => {
    const mockUpdateDoc = jest.fn();
    useFirestore.mockImplementation(() => ({
      isPending: false,
      error: null,
      checkIfUserExists: jest.fn(),
      updateDocument: mockUpdateDoc,
    }));
    const user = userEvent.setup();
    render(<Settings userData={mockUserData} />);
    const fullNameInput = screen.getByLabelText(/^name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // user name is to short
    await user.clear(fullNameInput);
    await user.type(fullNameInput, 'Neo');
    await user.click(submitButton);
    expect(
      screen.getByText('input full name, like "John Dow"')
    ).toBeInTheDocument();
    expect(mockUpdateDoc).toBeCalledTimes(0);
    await user.clear(fullNameInput);
    await user.type(fullNameInput, 'Neo Anderson');
    await user.click(submitButton);
    expect(
      screen.queryByText('input full name, like "John Dow"')
    ).not.toBeInTheDocument();
    expect(mockUpdateDoc).toBeCalledTimes(1);
  });
});
