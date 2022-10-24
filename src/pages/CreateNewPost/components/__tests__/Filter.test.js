import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from '../Filter';
import { UserPostContextProvider } from '../../../../context/UserPostContext';

import mockImagesData from '../../../../mocks/imagesData.json';

import { useUserPostContext } from '../../../../hooks/useUserPostContext';
jest.mock('../../../../hooks/useUserPostContext');

const mockFilterData = {
  brightness: '50',
  contrast: '15',
  saturation: '80',
  temperature: '35',
  fade: '0',
  vignette: '0',
};
describe('Filter component', () => {
  test('initial render', () => {
    useUserPostContext.mockImplementation(() => ({
      imagesData: mockImagesData,
      setImagesData: jest.fn(),
    }));
    render(
      <UserPostContextProvider>
        <Filter
          filterName={'test-filter'}
          filterData={mockFilterData}
          currentIndex={0}
        />
      </UserPostContextProvider>
    );
    const heading = screen.getByRole('heading', { name: /test-filter/i });
    expect(heading).toBeInTheDocument();
    // imagesData prop filterName === filterName in filter component
    expect(heading).toHaveClass('active');
  });

  test('update context on click', async () => {
    const temp = jest.fn();
    useUserPostContext.mockImplementation(() => ({
      imagesData: mockImagesData,
      setImagesData: temp,
    }));
    render(
      <UserPostContextProvider>
        <Filter
          filterName={'test-filter'}
          filterData={mockFilterData}
          currentIndex={0}
        />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    expect(temp).toBeCalledTimes(0);
    await user.click(screen.getByRole('heading', { name: /test-filter/i }));
    expect(temp).toBeCalledTimes(1);
  });
});
