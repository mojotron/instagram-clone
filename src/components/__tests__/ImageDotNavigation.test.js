import { render, screen } from '@testing-library/react';
import ImageDotNavigation from '../ImageDotNavigation';

describe('ImageDotNavigation', () => {
  test('one image does not render dots', () => {
    render(<ImageDotNavigation index={0} numOfImgs={1} />);
    expect(screen.queryByTestId('dot-navigation')).not.toBeInTheDocument();
  });

  test('display number of dots equal to numOfImages', () => {
    render(<ImageDotNavigation index={3} numOfImgs={5} />);
    const dotElements = screen.queryAllByTestId('dot-navigation-dot');
    expect(dotElements.length).toBe(5);
    // index points to active dot
    expect(dotElements[3]).toHaveClass('active');
  });
});
