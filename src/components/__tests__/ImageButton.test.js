import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageButton from '../ImageButton';

describe('ImageButton component', () => {
  test('renders icon and alt text', () => {
    render(
      <ImageButton
        icon={'/images/test.jpg'}
        alt="test text"
        handleClick={jest.fn()}
        active={false}
        hidden={false}
      />
    );
    const imgEle = screen.getByRole('img');
    expect(imgEle).toHaveAttribute('src', '/images/test.jpg');
    expect(imgEle).toHaveAttribute('alt', 'test text');
  });

  test('hidden and active disabled', () => {
    render(
      <ImageButton
        icon={'/images/test.jpg'}
        alt="test text"
        handleClick={jest.fn()}
        active={false}
        hidden={false}
      />
    );
    const btnEle = screen.getByRole('button');
    expect(btnEle).not.toHaveClass('active');
    expect(btnEle).toHaveStyle('visibility: visible');
  });

  test('hidden and active enabled', () => {
    render(
      <ImageButton
        icon={'/images/test.jpg'}
        alt="test text"
        handleClick={jest.fn()}
        active={true}
        hidden={true}
      />
    );
    const btnEle = screen.queryByRole('button', { hidden: true });
    expect(btnEle).toHaveClass('active');
    expect(btnEle).toHaveStyle('visibility: hidden');
  });

  test('handler', async () => {
    const handler = jest.fn();

    render(
      <div>
        <ImageButton
          icon={'/images/test.jpg'}
          alt="test text"
          handleClick={handler}
          active={false}
          hidden={false}
        />
      </div>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(handler).toBeCalledTimes(1);
  });
});
