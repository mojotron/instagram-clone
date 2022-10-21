import {
  render,
  screen,
} from '../../../test-utils/testing-library-userPostContext';
import userEvent from '@testing-library/user-event';
import CreateNewPost from '../CreateNewPost';
import mockUserData from '../../../mocks/userData.json';

global.URL.createObjectURL = jest.fn();

describe('CreateNewPost page', () => {
  describe('discard post', () => {
    test('cancel', async () => {
      render(
        <CreateNewPost userData={mockUserData} setShowCreatePost={jest.fn()} />
      );
      const user = userEvent.setup();
      const closeBtn = screen.getByAltText('close');
      expect(
        screen.queryByRole('heading', { name: /discard post/i })
      ).not.toBeInTheDocument();
      await user.click(closeBtn);
      expect(
        screen.getByRole('heading', { name: /discard post/i })
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /cancel/i }));
      expect(
        screen.queryByRole('heading', { name: /discard post/i })
      ).not.toBeInTheDocument();
    });

    test('discard', async () => {
      const handleDiscard = jest.fn();
      render(
        <CreateNewPost
          userData={mockUserData}
          setShowCreatePost={handleDiscard}
        />
      );
      expect(screen.getByTestId('create-post')).toBeInTheDocument();
      expect(handleDiscard).toBeCalledTimes(0);
      const user = userEvent.setup();
      await user.click(screen.getByAltText('close'));
      await user.click(screen.getByRole('button', { name: /discard/i }));
      // special case when current stage is 'choose-files
      expect(handleDiscard).toBeCalledTimes(2);
    });
  });

  describe('stage 1', () => {
    test('upload file', async () => {
      render(
        <CreateNewPost userData={mockUserData} setShowCreatePost={jest.fn()} />
      );
      const file = new File(['hello'], 'hello.png', {
        type: 'image/png',
      });
      const user = userEvent.setup();
      const fileInput = screen.getByTestId('file-input');
      // stage 1 heading
      expect(
        screen.getByRole('heading', { name: /create new post/i })
      ).toBeInTheDocument();
      await user.upload(fileInput, file);
      expect(fileInput).not.toBeInTheDocument();
      // stage 2 heading
      expect(
        screen.getByRole('heading', { name: /crop/i })
      ).toBeInTheDocument();
    });
  });
});
