import { render, screen, waitFor } from '@testing-library/react';
import ProfileDropdown from '../ProfileDropdown';
import userEvent from '@testing-library/user-event';
import { useLogout } from '../../../../hooks/useLogout';

jest.mock('../../../../hooks/useLogout', () => ({
  useLogout: jest.fn(() => ({
    isPending: false,
    error: null,
    logout: jest.fn(),
  })),
}));

describe('ProfileDropdown in Navbar component', () => {
  test('renders list elements', () => {
    useLogout.mockImplementation(() => ({
      isPending: false,
      error: null,
      logout: jest.fn(),
    }));
    render(<ProfileDropdown />);
    const listElements = screen.getAllByRole('listitem');
    const imgElements = screen.getAllByRole('img');
    expect(listElements.length).toBe(4);
    expect(listElements[0].textContent).toBe(imgElements[0].alt);
    expect(listElements[1].textContent).toBe(imgElements[1].alt);
    expect(listElements[2].textContent).toBe(imgElements[2].alt);
    expect(listElements[3]).toHaveTextContent('Logout');
  });

  test('pending and error from useLogout', async () => {
    useLogout.mockImplementation(() => ({
      isPending: true,
      error: 'something wrong',
      logout: jest.fn(),
    }));
    render(<ProfileDropdown />);
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('something wrong')).toBeInTheDocument();
  });
});
