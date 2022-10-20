import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwitchCheckbox from '../SwitchCheckbox';

describe('SwitchCheckBox component', () => {
  test('toggle switch', async () => {
    const changeHandler = jest.fn();
    render(
      <SwitchCheckbox value={false} name="temp" handleChange={changeHandler} />
    );
    const user = userEvent.setup();
    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).not.toBeChecked();
    await user.click(checkBox);
    expect(checkBox).toBeChecked();
    await user.click(checkBox);
    expect(checkBox).not.toBeChecked();
    expect(changeHandler).toBeCalledTimes(2);
  });
});
