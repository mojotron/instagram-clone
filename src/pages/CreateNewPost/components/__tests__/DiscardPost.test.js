import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiscardPost from '../DiscardPost';

describe('DiscardPost component', () => {
  test('initial render', () => {
    render(<DiscardPost handleCancel={jest.fn()} handleDiscard={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: /discard post\?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("If you leave, your edits won't be saved.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /discard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('handlers', async () => {
    const cancelHandle = jest.fn();
    const discardHandle = jest.fn();
    render(
      <DiscardPost handleCancel={cancelHandle} handleDiscard={discardHandle} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /discard/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(cancelHandle).toBeCalledTimes(1);
    expect(discardHandle).toBeCalledTimes(1);
  });
});
