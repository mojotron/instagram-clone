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
    render(<ImageSizePanel />);
    const user = userEvent.setup();
    const toggleZoomLevel = screen.getByAltText(/zoom slider/i);
    const panelMain = screen.getByTestId('image-size-panel');
    const panelChild = screen.getByTestId('size-panel-child');
    expect(panelChild).toHaveStyle('top: 0%');
    await user.click(toggleZoomLevel);
    const slider = screen.getByTestId('zoom-level-input');
    fireEvent.change(slider, { target: { value: 1.5 } });
    fireEvent.mouseDown(panelMain);
    fireEvent.mouseMove(panelMain, { target: { clientX: 10, clientY: 20 } });
    fireEvent.mouseUp(panelMain);
    expect(panelChild).toHaveStyle('transform: scale(1.5)');
    expect(panelChild).toHaveStyle('top: 5%');
    expect(panelChild).toHaveStyle('left: 5%');
  });
});
