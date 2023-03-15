import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InfoPopUpBox from '../InfoPopUpBox';

describe('InfoPopUpBox', () => {
  test('toggle popup box', async () => {
    render(<InfoPopUpBox title="Title" message="Message body" />);
    const user = userEvent.setup();
    const infoBoxBtn = screen.getByRole('button');
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
    await user.hover(infoBoxBtn);
    const popupElement = screen.getByText('Title');
    expect(popupElement).toBeInTheDocument();
    await user.hover(popupElement);
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });
});
