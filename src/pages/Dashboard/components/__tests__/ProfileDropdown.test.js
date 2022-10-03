import { render, screen } from '@testing-library/react';
import ProfileDropdown from '../ProfileDropdown';
import userEvent from '@testing-library/user-event';
import { useLogout } from '../../../../hooks/useLogout';
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom';

jest.mock('../../../../hooks/useLogout', () => ({
  useLogout: jest.fn(() => ({
    isPending: false,
    error: null,
    logout: jest.fn(),
  })),
}));

describe('ProfileDropdown in Navbar component', () => {
  test('settings list item', async () => {
    useLogout.mockImplementation(() => ({
      isPending: false,
      error: null,
      logout: jest.fn(),
    }));
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProfileDropdown />} />
          <Route path="/settings" element={<h1>Settings page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    const settingsListItem = screen.getByText(/settings/i);
    expect(
      screen.queryByRole('heading', { name: /settings page/i })
    ).not.toBeInTheDocument();
    await user.click(settingsListItem);
    expect(
      screen.getByRole('heading', { name: /settings page/i })
    ).toBeInTheDocument();
  });
  test('logout user with Logout list item', async () => {
    const mockLogout = jest.fn();
    useLogout.mockImplementation(() => ({
      isPending: false,
      error: null,
      logout: mockLogout,
    }));
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ProfileDropdown />
      </BrowserRouter>
    );
    const logoutListItem = screen.getByText(/logout/i);
    await user.click(logoutListItem);
    expect(mockLogout).toBeCalledTimes(1);
  });

  test('pending and error from useLogout', async () => {
    useLogout.mockImplementation(() => ({
      isPending: true,
      error: 'something wrong',
      logout: jest.fn(),
    }));
    render(
      <BrowserRouter>
        <ProfileDropdown />
      </BrowserRouter>
    );
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('something wrong')).toBeInTheDocument();
  });
});
