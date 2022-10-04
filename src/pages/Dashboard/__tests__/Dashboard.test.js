import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Dashboard from '../Dashboard';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useFirestore } from '../../../hooks/useFirestore';
import mockUserData from '../../../mocks/userData.json';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

jest.mock('../../../hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(() => ({
    context: mockUserData,
  })),
}));

jest.mock('../../../hooks/useFirestore', () => ({
  useFirestore: jest.fn(() => ({
    response: null,
    getDocument: jest.fn(),
  })),
}));

describe('Dashboard page', () => {
  test('toggle CreateNewPost page', async () => {
    useAuthContext.mockImplementation(() => ({ user: { uid: 1 } }));
    useFirestore.mockImplementation(() => ({
      response: { document: mockUserData },
      getDocument: jest.fn(),
    }));
    render(<Dashboard />);
    const user = userEvent.setup();
    const addPostListItem = screen.getByAltText('add post');
    expect(screen.queryByTestId('create-post')).not.toBeInTheDocument();
    await user.click(addPostListItem);
    expect(screen.getByTestId('create-post')).toBeInTheDocument();
    await user.click(addPostListItem);
    expect(screen.queryByTestId('create-post')).not.toBeInTheDocument();
  });
});
