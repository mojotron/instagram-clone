import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

const Child1 = () => <h1>Child 1</h1>;
const Child2 = () => <h1>Child 2</h1>;

describe('ProtectedRoute component', () => {
  test('condition is true display children elements', () => {
    render(
      <ProtectedRoute
        condition={true}
        goto="/"
        children={[<Child1 key="1" />, <Child2 key="2" />]}
      />
    );
    const childrenElements = screen.getAllByRole('heading');
    expect(childrenElements[0]).toHaveTextContent('Child 1');
    expect(childrenElements[1]).toHaveTextContent('Child 2');
  });

  test('condition is false navigate to home page', () => {
    render(
      <MemoryRouter initialEntries={['/temp']}>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route
            path="/temp"
            element={
              <ProtectedRoute
                condition={false}
                goto="/"
                children={[<Child1 key="1" />, <Child2 key="2" />]}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: /home page/i });
    expect(heading).toBeInTheDocument();
  });
});
