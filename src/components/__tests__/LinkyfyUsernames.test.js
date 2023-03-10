import { render, screen } from '@testing-library/react';
import LinkfyUsernames from '../LinkfyUsernames';
import { BrowserRouter } from 'react-router-dom';

describe('LinkfyUsernames', () => {
  test('no username passed', () => {
    const text = 'text without usernames returns no link elements';
    render(
      <BrowserRouter>
        <LinkfyUsernames text={text} />
      </BrowserRouter>
    );

    const linkElements = screen.queryAllByText(/@[a-zA-Z0-9_-]+/);
    expect(linkElements).toHaveLength(0);
  });

  test('one username passed', () => {
    const text = 'text with this @username returns one link';
    render(
      <BrowserRouter>
        <LinkfyUsernames text={text} />
      </BrowserRouter>
    );

    const linkElements = screen.queryAllByText(/@[a-zA-Z0-9_-]+/);
    expect(linkElements).toHaveLength(1);
    expect(linkElements[0]).toHaveClass('btn--username-link');
  });

  test('multiple usernames passed', () => {
    const text = 'text with this @username and @nickname returns two links';
    render(
      <BrowserRouter>
        <LinkfyUsernames text={text} />
      </BrowserRouter>
    );

    const linkElements = screen.queryAllByText(/@[a-zA-Z0-9_-]+/);
    expect(linkElements).toHaveLength(2);
    expect(linkElements[0]).toHaveClass('btn--username-link');
    expect(linkElements[0]).toHaveTextContent('@username');
    expect(linkElements[1]).toHaveClass('btn--username-link');
    expect(linkElements[1]).toHaveTextContent('@nickname');
  });

  test('multiple connected usernames passed', () => {
    const text = 'text with this @username@nickname returns two links';
    render(
      <BrowserRouter>
        <LinkfyUsernames text={text} />
      </BrowserRouter>
    );

    const linkElements = screen.queryAllByText(/@[a-zA-Z0-9_-]+/g);
    expect(linkElements).toHaveLength(2);
    expect(linkElements[0]).toHaveClass('btn--username-link');
    expect(linkElements[0]).toHaveTextContent('@username');
    expect(linkElements[1]).toHaveClass('btn--username-link');
    expect(linkElements[1]).toHaveTextContent('@nickname');
  });
});
