import { render, screen } from '@testing-library/react';
import CustomAlert from '../CustomAlert';

describe('CustomAlert renders correctly', () => {
  test('displays message', () => {
    render(<CustomAlert message={'Hello World!'} />);
    const heading = screen;
  });
});
