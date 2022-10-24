import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdjustmentBar from '../AdjustmentBar';
import { UserPostContextProvider } from '../../../../context/UserPostContext';

import mockImagesData from '../../../../mocks/imagesData.json';

import { useUserPostContext } from '../../../../hooks/useUserPostContext';
jest.mock('../../../../hooks/useUserPostContext');

describe('AdjustmentBar', () => {
  test('initial render', async () => {
    render(
      <AdjustmentBar
        title="fade"
        values={{ min: 0, max: 100, current: 25 }}
        changeState={jest.fn()}
        currentIndex={0}
        updateFiltersAndLayers={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const slider = screen.getByLabelText('fade');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveValue('25');
    await user.hover(slider);
    expect(screen.getByRole('button', { name: /reset/i })).toHaveStyle(
      'visibility: visible'
    );
  });
  test('on change', () => {});
  test('reset value', () => {
    // on hover doest show reset button
  });
  test('bold', () => {});
});
