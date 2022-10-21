import React from 'react';
import {
  render,
  screen,
} from '../../../../test-utils/testing-library-userPostContext';
import userEvent from '@testing-library/user-event';
import ImageSizePanel from '../ImageSizePanel';

describe('ImageSizePanel component', () => {
  test('change aspect ratio', async () => {
    render(<ImageSizePanel />);
    const user = userEvent.setup();
    const toggleAspectRatio = screen.getByAltText(/change size/i);
    expect(screen.queryByTestId('change-size-popup')).not.toBeInTheDocument();
    await user.click(toggleAspectRatio);
    expect(screen.getByTestId('change-size-popup')).toBeInTheDocument();
    const panelParent = screen.getByTestId('size-panel-parent');
    expect(panelParent).toHaveStyle('width: 100%');
    expect(panelParent).toHaveStyle('height: 100%');
    await user.click(screen.getByRole('button', { name: '4:5' }));
    expect(panelParent).toHaveStyle('width: 80%');
    expect(panelParent).toHaveStyle('height: 100%');
    await user.click(screen.getByRole('button', { name: '16:9' }));
    expect(panelParent).toHaveStyle('width: 100%');
    expect(panelParent).toHaveStyle('height: 56.25%');
    // await user.click(screen.getByRole('button', { name: 'original' }));
    // expect(panelParent).toHaveStyle('width: 100%');
    // expect(panelParent).toHaveStyle('height: 56.25%');
  });

  test('change zoom level', async () => {
    render(<ImageSizePanel />);
    const user = userEvent.setup();
    const toggleZoomLevel = screen.getByAltText(/zoom slider/i);
    expect(screen.queryByTestId('zoom-level-popup')).not.toBeInTheDocument();
    await user.click(toggleZoomLevel);
    expect(screen.getByTestId('zoom-level-popup')).toBeInTheDocument();
    const panelChild = screen.getByTestId('size-panel-child');
    expect(panelChild).toHaveStyle('transform: scale(1)');
    await user.type(screen.getByTestId('zoom-level-input'), '2');
    expect(panelChild).toHaveStyle('transform: scale(2)');
  });
});
