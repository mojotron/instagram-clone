import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageNavigation from '../ImageNavigation';

describe('ImageNavigation component', () => {
  test('navigate right', async () => {
    let currentIndex = 0;
    const addToCurrentIndex = jest.fn(() => (currentIndex += 1));
    const subToCurrentIndex = jest.fn(() => (currentIndex -= 1));

    const { rerender } = render(
      <ImageNavigation
        index={currentIndex}
        setIndex={addToCurrentIndex}
        numOfImgs={3}
      />
    );
    const user = userEvent.setup();
    const prevBtn = screen.getByAltText('previous');
    const nextBtn = screen.getByAltText('next');
    expect(prevBtn).toHaveStyle('visibility: hidden');
    expect(nextBtn).toHaveStyle('visibility: visible');
    await user.click(nextBtn);
    rerender(
      <ImageNavigation
        index={currentIndex}
        setIndex={addToCurrentIndex}
        numOfImgs={3}
      />
    );
    expect(prevBtn).toHaveStyle('visibility: visible');
    expect(nextBtn).toHaveStyle('visibility: visible');
    await user.click(nextBtn);
    rerender(
      <ImageNavigation
        index={currentIndex}
        setIndex={subToCurrentIndex}
        numOfImgs={3}
      />
    );
    expect(prevBtn).toHaveStyle('visibility: visible');
    expect(nextBtn).toHaveStyle('visibility: hidden');
    await user.click(prevBtn);
    rerender(
      <ImageNavigation
        index={currentIndex}
        setIndex={subToCurrentIndex}
        numOfImgs={3}
      />
    );
    expect(prevBtn).toHaveStyle('visibility: visible');
    expect(nextBtn).toHaveStyle('visibility: visible');
    await user.click(prevBtn);
    rerender(
      <ImageNavigation
        index={currentIndex}
        setIndex={subToCurrentIndex}
        numOfImgs={3}
      />
    );
    expect(prevBtn).toHaveStyle('visibility: hidden');
    expect(nextBtn).toHaveStyle('visibility: visible');
  });

  test('display 1 image', () => {
    render(<ImageNavigation index={0} setIndex={jest.fn()} numOfImgs={1} />);
    expect(screen.getByAltText('previous')).toHaveStyle('visibility: hidden');
    expect(screen.getByAltText('next')).toHaveStyle('visibility: hidden');
  });
});
