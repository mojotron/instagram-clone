import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../../../../test-utils/testing-library-userPostContext';
import userEvent from '@testing-library/user-event';
import ImageSizePanel from '../ImageSizePanel';

// import { useUserPostContext } from '../../../../hooks/useUserPostContext';
// jest.mock('../../../../hooks/useUserPostContext', () => ({
//   useUserPostContext: jest.fn(() => ({
//     setFiles: jest.fn(),
//     tempImageUrls: [],
//     dimensions: {},
//     setDimensions: jest.fn(),
//     setCurrentStage: jest.fn(),
//   })),
// }));

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
    const slider = screen.getByTestId('zoom-level-input');
    fireEvent.change(slider, { target: { value: 1.8 } });
    expect(panelChild).toHaveStyle('transform: scale(1.8)');
  });

  test('change image position', async () => {
    // mock getBoundingClientRec
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      };
    });

    render(<ImageSizePanel />);
    const user = userEvent.setup();
    const toggleZoomLevel = screen.getByAltText(/zoom slider/i);
    const panelMain = screen.getByTestId('image-size-panel');
    const panelChild = screen.getByTestId('size-panel-child');
    expect(panelChild).toHaveStyle('top: 0%');
    expect(panelChild).toHaveStyle('left: 0%');
    await user.click(toggleZoomLevel);
    const slider = screen.getByTestId('zoom-level-input');
    fireEvent.change(slider, { target: { value: 1.5 } });
    fireEvent.mouseDown(panelMain, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(panelChild, { clientX: 75, clientY: 75 });
    fireEvent.mouseUp(panelMain, { clientX: 75, clientY: 75 });
    expect(panelChild).toHaveStyle('transform: scale(1.5)');
    expect(panelChild).toHaveStyle('top: -25%');
    expect(panelChild).toHaveStyle('left: -25%');
  });

  test('Manage files', async () => {
    render(<ImageSizePanel />);
    const user = userEvent.setup();
    const toggleManageFiles = screen.getByAltText(/add and arrange images/i);
    expect(screen.queryByTestId('manage-files')).not.toBeInTheDocument();
    await user.click(toggleManageFiles);
    expect(screen.getByTestId('manage-files')).toBeInTheDocument();
  });
});
