import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageInfoPanel from '../ImageInfoPanel';
import { UserPostContextProvider } from '../../../../context/UserPostContext';

import mockImagesData from '../../../../mocks/imagesData.json';
import mockDimensions from '../../../../mocks/dimensionsData.json';
import mockUserData from '../../../../mocks/userData.json';
import mockPostInfo from '../../../../mocks/postInfoData.json';
// import EmojiPicker from 'emoji-picker-react';
import { useUserPostContext } from '../../../../hooks/useUserPostContext';
jest.mock('../../../../hooks/useUserPostContext');
// jest.mock('emoji-picker-react');

describe('AdjustmentWrapper component', () => {
  test('renders user data', async () => {
    useUserPostContext.mockImplementation(() => ({
      dimensions: mockDimensions,
      imagesData: mockImagesData,
      setImagesData: jest.fn(),
      postInfo: mockPostInfo,
      setPostInfo: jest.fn(),
      setCurrentStage: jest.fn(),
    }));

    render(
      <UserPostContextProvider>
        <ImageInfoPanel userData={mockUserData} handleCreatePost={jest.fn()} />
      </UserPostContextProvider>
    );
    expect(
      screen.getByRole('heading', { name: mockUserData.userName })
    ).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  test('change caption and location fields', async () => {
    const updatePostInfo = jest.fn();

    useUserPostContext.mockImplementation(() => ({
      dimensions: mockDimensions,
      imagesData: mockImagesData,
      setImagesData: jest.fn(),
      postInfo: mockPostInfo,
      setPostInfo: updatePostInfo,
      setCurrentStage: jest.fn(),
    }));

    render(
      <UserPostContextProvider>
        <ImageInfoPanel
          userData={mockUserData}
          handleCreatePost={jest.fn()}
          error={null}
          isPending={false}
        />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    const inputCaption = screen.getByPlaceholderText(/write a caption/i);
    const captionCarCount = screen.getByTestId('caption-char-count');
    expect(inputCaption).toHaveValue('');
    expect(captionCarCount).toHaveTextContent('0/2200');
    await user.type(inputCaption, 'test');
    expect(updatePostInfo).toBeCalledTimes(4); // for each character
    await user.type(screen.getByPlaceholderText(/add location/i), 'abc');
    expect(updatePostInfo).toBeCalledTimes(7); // test + abc
  });

  test('accessibility tab', async () => {
    const updateImagesData = jest.fn();
    useUserPostContext.mockImplementation(() => ({
      dimensions: mockDimensions,
      imagesData: mockImagesData,
      setImagesData: updateImagesData,
      postInfo: mockPostInfo,
      setPostInfo: jest.fn(),
      setCurrentStage: jest.fn(),
    }));

    render(
      <UserPostContextProvider>
        <ImageInfoPanel
          userData={mockUserData}
          handleCreatePost={jest.fn()}
          error={null}
          isPending={false}
        />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    const tab = screen.getByRole('heading', { name: /accessibility/i });
    expect(screen.getAllByAltText('expand').length).toBe(2);
    await user.click(tab);
    expect(screen.getAllByAltText('expand').length).toBe(1);
    const altInputs = screen.getAllByTestId('alt-input');
    expect(altInputs.length).toBe(2);
    await user.type(altInputs[0], 'test');
    expect(updateImagesData).toBeCalledTimes(4);
    await user.type(altInputs[1], 'abc');
    expect(updateImagesData).toBeCalledTimes(7);
    await user.click(tab);
    expect(screen.getAllByAltText('expand').length).toBe(2);
  });

  test('advance setting tab', async () => {
    const updatePostInfo = jest.fn();

    useUserPostContext.mockImplementation(() => ({
      dimensions: mockDimensions,
      imagesData: mockImagesData,
      setImagesData: jest.fn(),
      postInfo: mockPostInfo,
      setPostInfo: updatePostInfo,
      setCurrentStage: jest.fn(),
    }));

    render(
      <UserPostContextProvider>
        <ImageInfoPanel
          userData={mockUserData}
          handleCreatePost={jest.fn()}
          error={null}
          isPending={false}
        />
      </UserPostContextProvider>
    );
    const user = userEvent.setup();
    const tab = screen.getByRole('heading', { name: /advance settings/i });
    expect(screen.getAllByAltText('expand').length).toBe(2);
    await user.click(tab);
    expect(screen.getAllByAltText('expand').length).toBe(1);
    const checkBoxes = screen.getAllByRole('checkbox');
    expect(checkBoxes.length).toBe(2);
    expect(updatePostInfo).toBeCalledTimes(0);
    await user.click(checkBoxes[0]);
    expect(updatePostInfo).toBeCalledTimes(1);
    await user.click(checkBoxes[1]);
    expect(updatePostInfo).toBeCalledTimes(2);
    await user.click(tab);
    expect(screen.getAllByAltText('expand').length).toBe(2);
  });

  test('create post pending and loading', () => {
    useUserPostContext.mockImplementation(() => ({
      dimensions: mockDimensions,
      imagesData: mockImagesData,
      setImagesData: jest.fn(),
      postInfo: mockPostInfo,
      setPostInfo: jest.fn(),
      setCurrentStage: jest.fn(),
    }));

    render(
      <UserPostContextProvider>
        <ImageInfoPanel
          userData={mockUserData}
          handleCreatePost={jest.fn()}
          error={'Ops!'}
          isPending={true}
        />
      </UserPostContextProvider>
    );

    expect(screen.getByText('Ops!')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
