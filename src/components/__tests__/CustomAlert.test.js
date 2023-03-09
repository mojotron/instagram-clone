import { render, screen } from '@testing-library/react';
import CustomAlert from '../CustomAlert';

describe('CustomAlert renders correctly', () => {
  test('displays message', () => {
    render(<CustomAlert message={'Hello World!'} />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('Instagram Clone Alert!');
    const customParagraph = screen.getByText('Hello World!', { exact: true });
    expect(customParagraph).toBeInTheDocument();
    const paragraphElement = screen.getByText(content =>
      content.startsWith('Press')
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
