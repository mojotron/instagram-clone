import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostImage from '../PostImage';

import mockImagesData from '../../mocks/imagesData.json';
import mockDimensions from '../../mocks/dimensionsData.json';

describe('PostImage component', () => {
  test('initial render', () => {
    render(
      <PostImage imagesData={mockImagesData} dimensions={mockDimensions} />
    );
    const containerEle = screen.getByTestId('post-image-container');
    // dimensions width and height (aspect ratio) are set to container
    expect(containerEle).toHaveStyle(mockDimensions.aspectRatio);
    // initial display first image
    const imgEle = screen.getByAltText(mockImagesData[0].alt);
    // zoom level position and filter are set to image
    expect(imgEle).toHaveStyle(`transform: scale(${mockDimensions.zoomLevel})`);
    expect(imgEle).toHaveStyle(`top: ${mockDimensions.position.y}%`);
    expect(imgEle).toHaveStyle(`left: ${mockDimensions.position.x}%`);
    expect(imgEle).toHaveStyle(`filter: ${mockImagesData[0].filter}`);
    // layers
    const layerElements = screen.getAllByTestId('post-image-layer');
    expect(layerElements.length).toBe(mockImagesData[0].layers.length);
    expect(layerElements[0]).toHaveStyle(mockImagesData[0].layers[0]);
    expect(layerElements[1]).toHaveStyle(mockImagesData[0].layers[1]);
  });

  test('navigation', async () => {
    render(
      <PostImage imagesData={mockImagesData} dimensions={mockDimensions} />
    );
    const user = userEvent.setup();
    const [prevBtn, nextBtn] = screen.getAllByRole('button', { hidden: true });

    const dotNavigation = screen.getAllByTestId('dot-navigation-dot');
    expect(screen.getByAltText(mockImagesData[0].alt)).toBeInTheDocument();
    expect(
      screen.queryByAltText(mockImagesData[1].alt)
    ).not.toBeInTheDocument();
    expect(prevBtn).toHaveStyle('visibility: hidden');
    expect(nextBtn).toHaveStyle('visibility: visible');
    expect(dotNavigation[0]).toHaveClass('active');
    expect(dotNavigation[1]).not.toHaveClass('active');
    await user.click(nextBtn);
    expect(
      screen.queryByAltText(mockImagesData[0].alt)
    ).not.toBeInTheDocument();
    expect(screen.getByAltText(mockImagesData[1].alt)).toBeInTheDocument();
    expect(prevBtn).toHaveStyle('visibility: visible');
    expect(nextBtn).toHaveStyle('visibility: hidden');
    expect(dotNavigation[0]).not.toHaveClass('active');
    expect(dotNavigation[1]).toHaveClass('active');
  });

  test('bonus feature for post creation phase', async () => {
    // keep reference of current image in parent element with
    // useEffect and handler function
    let currentIndex;
    const handleIndex = jest.fn(num => (currentIndex = num));
    render(
      <PostImage
        imagesData={mockImagesData}
        dimensions={mockDimensions}
        getImageIndex={handleIndex}
      />
    );
    const user = userEvent.setup();
    const [prevBtn, nextBtn] = screen.getAllByRole('button', { hidden: true });

    expect(currentIndex).toBe(0);
    await user.click(nextBtn);
    expect(currentIndex).toBe(1);
    await user.click(prevBtn);
    expect(currentIndex).toBe(0);
  });
});
