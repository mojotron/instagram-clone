import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import mockUserData from '../../../../mocks/userData.json';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Dashboard Header component', () => {
  test('home link', async () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Header userData={mockUserData} />
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/settings" element={<h1>Settings Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    // navigate to settings and back to home
    expect(
      screen.getByRole('heading', { name: /settings page/i })
    ).toBeInTheDocument();
    await user.click(screen.getByAltText('home'));
    expect(
      screen.getByRole('heading', { name: /home page/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /settings page/i })
    ).not.toBeInTheDocument();
  });

  test('main heading is link to home', async () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Header userData={mockUserData} />
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/settings" element={<h1>Settings Page</h1>} />
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    // navigate to settings and back to home
    expect(
      screen.getByRole('heading', { name: /settings page/i })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('heading', { name: /instagram clone/i }));
    expect(
      screen.getByRole('heading', { name: /home page/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /settings page/i })
    ).not.toBeInTheDocument();
  });

  test('header has navbar', async () => {
    render(
      <BrowserRouter>
        <Header userData={mockUserData} />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // nav bar is unit tested in own test file
  });
});
