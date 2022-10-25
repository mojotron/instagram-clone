import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdjustmentBar from '../AdjustmentBar';

describe('AdjustmentBar', () => {
  test('initial render', async () => {
    render(
      <AdjustmentBar
        title="fade"
        values={{ min: 0, max: 100, current: 25 }}
        changeState={jest.fn()}
        currentIndex={0}
        updateFiltersAndLayers={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const slider = screen.getByLabelText('fade');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveValue('25');
    await user.hover(slider);
    expect(screen.getByRole('button', { name: /reset/i })).toHaveStyle(
      'visibility: visible'
    );
  });
  test('on change', () => {
    render(
      <AdjustmentBar
        title="fade"
        values={{ min: 0, max: 100, current: 25 }}
        changeState={jest.fn()}
        currentIndex={0}
        updateFiltersAndLayers={jest.fn()}
      />
    );
    const slider = screen.getByLabelText('fade');
    const valueEle = screen.getByTestId('adjustment-number');
    expect(valueEle).toHaveTextContent('25');
    fireEvent.change(slider, { target: { value: 50 } });
    expect(valueEle).toHaveTextContent('50');
  });

  test('reset value', async () => {
    render(
      <AdjustmentBar
        title="fade"
        values={{ min: 0, max: 100, current: 25 }}
        changeState={jest.fn()}
        currentIndex={0}
        updateFiltersAndLayers={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const slider = screen.getByLabelText('fade');
    const valueEle = screen.getByTestId('adjustment-number');

    expect(valueEle).toHaveTextContent('25');
    fireEvent.change(slider, { target: { value: 50 } });
    expect(valueEle).toHaveTextContent('50');
    await user.hover(slider);
    const resetBtn = screen.getByRole('button', {
      name: /reset/i,
    });
    expect(resetBtn).toHaveStyle('visibility: visible');
    await user.click(resetBtn);
    expect(resetBtn).toHaveStyle('visibility: hidden');
    expect(valueEle).toHaveTextContent('0');
    // on hover doest show reset button
  });

  test('bold', async () => {
    const mockChangeState = jest.fn();
    const mockUpdateFiltersAndLayers = jest.fn();
    render(
      <AdjustmentBar
        title="fade"
        values={{ min: 0, max: 100, current: 25 }}
        changeState={mockChangeState}
        currentIndex={0}
        updateFiltersAndLayers={mockUpdateFiltersAndLayers}
      />
    );
    const slider = screen.getByLabelText('fade');
    const valueEle = screen.getByTestId('adjustment-number');
    expect(valueEle).toHaveStyle('fontWeight: 400');
    fireEvent.mouseDown(slider);
    expect(valueEle).toHaveStyle('fontWeight: 700');
    fireEvent.change(slider, { target: { value: 30 } });
    expect(valueEle).toHaveStyle('fontWeight: 700');
    fireEvent.mouseUp(slider);
    expect(valueEle).toHaveStyle('fontWeight: 400');
    expect(valueEle).toHaveTextContent(30);
    // call useUserPost context functions passed as propsi in wrapper
    expect(mockChangeState).toBeCalledTimes(1);
    expect(mockUpdateFiltersAndLayers).toBeCalledTimes(1);
  });
});
