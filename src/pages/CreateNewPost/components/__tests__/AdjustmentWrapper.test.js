import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdjustmentWrapper from '../AdjustmentWrapper';
import { UserPostContextProvider } from '../../../../context/UserPostContext';

import mockImagesData from '../../../../mocks/imagesData.json';

import { useUserPostContext } from '../../../../hooks/useUserPostContext';
jest.mock('../../../../hooks/useUserPostContext');

describe('AdjustmentWrapper component', () => {
  test('call useUserPostContext functions', () => {
    const mockChangeState = jest.fn();
    const mockUpdateFiltersAndLayers = jest.fn();

    useUserPostContext.mockImplementation(() => ({
      imagesData: mockImagesData,
      setImagesData: mockChangeState,
      updateFiltersAndLayers: mockUpdateFiltersAndLayers,
    }));

    render(
      <UserPostContextProvider>
        <AdjustmentWrapper currentIndex={0} />
      </UserPostContextProvider>
    );
    const slider = screen.getByLabelText('fade');
    fireEvent.mouseDown(slider);
    fireEvent.change(slider, { target: { value: 30 } });
    expect(mockChangeState).toBeCalledTimes(0);
    expect(mockUpdateFiltersAndLayers).toBeCalledTimes(0);
    fireEvent.mouseUp(slider);
    expect(mockChangeState).toBeCalledTimes(1);
    expect(mockUpdateFiltersAndLayers).toBeCalledTimes(1);
  });
});
