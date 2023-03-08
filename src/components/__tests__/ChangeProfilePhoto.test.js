import { render, screen } from '@testing-library/react';
import ChangeProfilePhoto from '../ChangeProfilePhoto';
import userEvent from '@testing-library/user-event';

import { useSetAvatar } from '../../hooks/useSetAvatar';
import { MAX_AVATAR_IMAGE_SIZE } from '../../constants/constants';

jest.mock('../../hooks/useSetAvatar', () => ({
  useSetAvatar: jest.fn(() => ({
    isPending: false,
    error: null,
    addAvatar: jest.fn(),
    removeAvatar: jest.fn(),
  })),
}));

describe('ChangeProfilePhoto component', () => {
  test('upload image and set new avatar', async () => {
    useSetAvatar.mockImplementation(() => ({
      isPending: false,
      error: null,
      addAvatar: jest.fn(),
      removeAvatar: jest.fn(),
    }));
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    render(
      <ChangeProfilePhoto
        userId={1}
        userAvatar={{ avatar: { url: 'avatars/bob.jpg', fileName: 'bob.jpg' } }}
        handleDisplay={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const fileInput = screen.getByTestId('file-input');
    expect(
      screen.queryByRole('button', {
        name: /set new image/i,
      })
    ).not.toBeInTheDocument();
    await user.upload(fileInput, file);
    expect(fileInput.files[0]).toStrictEqual(file);
    const addAvatarBtn = screen.getByRole('button', {
      name: /set new image/i,
    });
    expect(addAvatarBtn).toBeInTheDocument();
    await user.click(addAvatarBtn);
    expect(useSetAvatar).toBeCalledTimes(2); // first time with mockImplementation
  });

  test('remove avatar', async () => {
    useSetAvatar.mockImplementation(() => ({
      isPending: false,
      error: null,
      addAvatar: jest.fn(),
      removeAvatar: jest.fn(),
    }));
    render(
      <ChangeProfilePhoto
        userId={1}
        userAvatar={{ avatar: { url: 'avatars/bob.jpg', fileName: 'bob.jpg' } }}
        handleDisplay={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const removeAvatarBtn = screen.getByRole('button', {
      name: /remove current photo/i,
    });
    await user.click(removeAvatarBtn);
    expect(useSetAvatar).toBeCalledTimes(1);
  });

  test('cancel button', async () => {
    useSetAvatar.mockImplementation(() => ({
      isPending: false,
      error: null,
      addAvatar: jest.fn(),
      removeAvatar: jest.fn(),
    }));

    const handleCancel = jest.fn();
    render(
      <ChangeProfilePhoto
        userId={1}
        userAvatar={{ avatar: { url: 'avatars/bob.jpg', fileName: 'bob.jpg' } }}
        handleDisplay={handleCancel}
      />
    );
    const user = userEvent.setup();
    const cancelBtn = screen.getByRole('button', {
      name: /cancel/i,
    });
    await user.click(cancelBtn);
    expect(handleCancel).toBeCalledTimes(1);
  });

  test('file size too big over 2MB', async () => {
    useSetAvatar.mockImplementation(() => ({
      isPending: false,
      error: null,
      addAvatar: jest.fn(),
      removeAvatar: jest.fn(),
    }));
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    // mock file size
    Object.defineProperty(file, 'size', { value: MAX_AVATAR_IMAGE_SIZE + 1 });
    render(
      <ChangeProfilePhoto
        userId={1}
        userAvatar={{ avatar: { url: 'avatars/bob.jpg', fileName: 'bob.jpg' } }}
        handleDisplay={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const fileInput = screen.getByTestId('file-input');

    await user.upload(fileInput, file);
    expect(
      screen.getByText('File is to big (limit 500KB)')
    ).toBeInTheDocument();
  });

  test('isPending and error from useStAvatar hook', () => {
    useSetAvatar.mockImplementation(() => ({
      isPending: true,
      error: 'something wrong',
      addAvatar: jest.fn(),
      removeAvatar: jest.fn(),
    }));

    const handleCancel = jest.fn();
    render(
      <ChangeProfilePhoto
        userId={1}
        userAvatar={{ avatar: { url: 'avatars/bob.jpg', fileName: 'bob.jpg' } }}
        handleDisplay={handleCancel}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText(/something wrong/i)).toBeInTheDocument();
  });
});
