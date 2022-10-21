import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNewPost from '../CreateNewPost';
import mockUserData from '../../../mocks/userData.json';

import { UserPostContextProvider } from '../../../context/UserPostContext';

describe('CreateNewPost page', () => {
  describe('discard post', () => {
    test('cancel', async () => {
      render(
        <UserPostContextProvider>
          <CreateNewPost
            userData={mockUserData}
            setShowCreatePost={jest.fn()}
          />
        </UserPostContextProvider>
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
        <UserPostContextProvider>
          <CreateNewPost
            userData={mockUserData}
            setShowCreatePost={handleDiscard}
          />
        </UserPostContextProvider>
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
});
