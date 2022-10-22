import {
  render,
  screen,
} from '../../../../test-utils/testing-library-userPostContext';
import userEvent from '@testing-library/user-event';
import CreatePostHeader from '../CreatePostHeader';

describe('CreatePostHeader component', () => {
  test('display elements', () => {
    render(
      <CreatePostHeader
        title="Create Post"
        btnText="next"
        handleNext={jest.fn()}
        handlePrev={jest.fn()}
      />
    );
    expect(
      screen.getByRole('heading', { name: /create post/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toHaveStyle(
      'visibility: visible'
    );
    expect(screen.getByAltText('go back')).toHaveStyle('visibility: visible');
  });

  test('when handler is not given button is hidden', () => {
    render(
      <CreatePostHeader
        title="Create Post"
        btnText="next"
        handleNext={null}
        handlePrev={null}
      />
    );
    const btns = screen.getAllByRole('button', { hidden: true });
    expect(btns.length).toBe(2);
    expect(btns[0]).toHaveStyle('visibility: hidden');
    expect(btns[1]).toHaveStyle('visibility: hidden');
  });

  test('handlers get called', async () => {
    const goNextHandler = jest.fn();
    const goBackHandler = jest.fn();

    render(
      <CreatePostHeader
        title="Create Post"
        btnText="next"
        handleNext={goNextHandler}
        handlePrev={goBackHandler}
      />
    );
    const user = userEvent.setup();
    expect(goNextHandler).toBeCalledTimes(0);
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(goNextHandler).toBeCalledTimes(1);

    expect(goBackHandler).toBeCalledTimes(0);
    await user.click(screen.getByAltText('go back'));
    expect(goBackHandler).toBeCalledTimes(1);
  });

  test('btn default text', () => {
    render(
      <CreatePostHeader
        title="Create Post"
        btnText={null}
        handleNext={jest.fn()}
        handlePrev={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
