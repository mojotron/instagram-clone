// import {
//   render,
//   screen,
// } from '../../../../test-utils/testing-library-userPostContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManageImagePopup from '../ManageImagePopup';

import { UserPostContextProvider } from '../../../../context/UserPostContext';
import { useUserPostContext } from '../../../../hooks/useUserPostContext';
jest.mock('../../../../hooks/useUserPostContext');

describe('ManageImagePopup component', () => {
  test('add file', async () => {
    const mockTempImageUrls = ['img0.jpg'];
    useUserPostContext.mockImplementation(() => ({
      tempImageUrls: mockTempImageUrls,
      addFile: jest.fn(() =>
        mockTempImageUrls.push(`img${mockTempImageUrls.length}.jpg`)
      ),
    }));
    render(
      <UserPostContextProvider>
        <ManageImagePopup currentImage={0} setCurrentImage={jest.fn()} />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    const file = new File([''], 'img1.jpg', { type: 'image/jpg' });
    expect(screen.getAllByRole('img').length).toBe(1);
    const input = screen.getByLabelText('+');
    await user.upload(input, file);
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  test('delete file', async () => {
    const mockTempImageUrls = ['img0.jpg', 'img1.jpg'];
    useUserPostContext.mockImplementation(() => ({
      tempImageUrls: mockTempImageUrls,
      deleteFile: jest.fn(() => mockTempImageUrls.pop()),
    }));
    render(
      <UserPostContextProvider>
        <ManageImagePopup currentImage={0} setCurrentImage={jest.fn()} />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    expect(screen.getAllByRole('img').length).toBe(2);
    const deleteBtns = screen.getAllByRole('button', { name: 'x' });
    await user.dblClick(deleteBtns[1]);
    expect(screen.getAllByRole('button', { name: 'x' }).length).toBe(1);
  });

  test('handle click to change current file', async () => {
    let index = 0;
    const mockTempImageUrls = ['img0.jpg', 'img1.jpg', 'img2.jpg'];
    useUserPostContext.mockImplementation(() => ({
      tempImageUrls: mockTempImageUrls,
    }));

    const handleChangeIndex = jest.fn(i => (index = i));

    render(
      <UserPostContextProvider>
        <ManageImagePopup
          currentImage={index}
          setCurrentImage={handleChangeIndex}
        />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    const items = screen.getAllByTestId('manage-files-item');
    expect(items.length).toBe(3);
    await user.click(items[2]);

    expect(handleChangeIndex).toBeCalledTimes(1);
    // index of mapping do display items
    expect(handleChangeIndex).toBeCalledWith(2);
    expect(index).toBe(2);
  });

  test('reorder files', async () => {
    const mockTempImageUrls = ['img0.jpg', 'img1.jpg', 'img2.jpg'];
    useUserPostContext.mockImplementation(() => ({
      tempImageUrls: mockTempImageUrls,
    }));
    render(
      <UserPostContextProvider>
        <ManageImagePopup currentImage={0} setCurrentImage={jest.fn()} />
      </UserPostContextProvider>
    );
    const items = screen.getAllByTestId('manage-files-item');
    expect(items[0]).toHaveAttribute('draggable');
    // cypress is better for testing drag and drop
  });
});
