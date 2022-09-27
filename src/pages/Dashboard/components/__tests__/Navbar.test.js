import { render, screen } from '../../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

describe('Navbar component', () => {
  test('toggle ProfileDropdown', () => {
    render(<Navbar />);
  });
});
