import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageEditPanel from '../ImageEditPanel';

import mockDimensions from '../../../../mocks/dimensionsData.json';
import mockImagesData from '../../../../mocks/imagesData.json';

import { UserPostContextProvider } from '../../../../context/UserPostContext';
import { useUserPostContext } from '../../../../hooks/useUserPostContext';
jest.mock('../../../../hooks/useUserPostContext');

describe('ImageEditPanel component', () => {
  test('toggle filters adjustments', async () => {
    useUserPostContext.mockImplementation(() => ({
      dimensions: mockDimensions,
      imagesData: mockImagesData,
    }));
    render(
      <UserPostContextProvider>
        <ImageEditPanel />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    // display image + 12 filters
    expect(screen.getAllByTestId('post-image-container').length).toBe(13);
    await user.click(screen.getByRole('button', { name: /adjustments/i }));
    // display image, no filters, current tab is adjustment bars
    expect(screen.getAllByTestId('post-image-container').length).toBe(1);
    expect(screen.getByLabelText('brightness')).toBeInTheDocument();
    expect(screen.getByLabelText('contrast')).toBeInTheDocument();
    expect(screen.getByLabelText('saturation')).toBeInTheDocument();
    expect(screen.getByLabelText('temperature')).toBeInTheDocument();
    expect(screen.getByLabelText('fade')).toBeInTheDocument();
    expect(screen.getByLabelText('vignette')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /filters/i }));
    expect(screen.queryByLabelText('brightness')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('post-image-container').length).toBe(13);
    // this test covers FilterWrapper and AdjustmentsWrapper components
  });
});
