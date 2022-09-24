import { render, screen } from '@testing-library/react';
import InputWithError from '../InputWithError';
import userEvent from '@testing-library/user-event';

describe('InputWithError component', () => {
  test('initial render, input with type, name and placeholder attributes, no imgs', () => {
    render(
      <InputWithError
        type="email"
        name="email"
        placeholder="Email"
        setFormData={jest.fn()}
        handleValidation={jest.fn()}
      />
    );

    const inputElement = screen.getByPlaceholderText('Email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('name', 'email');
  });

  test('valid input typed', async () => {
    render(
      <InputWithError
        type="email"
        name="email"
        placeholder="Email"
        setFormData={jest.fn()}
        handleValidation={jest.fn()}
      />
    );
    const user = userEvent.setup();
    const inputElement = screen.getByPlaceholderText('Email');
    // no icon for confirming valid input
    expect(screen.queryByAltText('valid input')).toBeFalsy();
    await user.clear(inputElement);
    await user.type(inputElement, 'test@example.com');
    // icon for confirming valid input
    const checkIcon = screen.getByAltText('valid input');
    expect(inputElement).toHaveValue('test@example.com');
    expect(checkIcon).toBeInTheDocument();
  });

  test('invalid input typed', async () => {
    render(
      <InputWithError
        type="email"
        name="email"
        placeholder="Email"
        setFormData={jest.fn()}
        handleValidation={jest.fn(() => {
          throw new Error('invalid email');
        })}
      />
    );
    const user = userEvent.setup();
    const inputElement = screen.getByPlaceholderText('Email');
    // no icon for confirming invalid input
    expect(screen.queryByAltText('invalid input')).toBeFalsy();
    await user.clear(inputElement);
    await user.type(inputElement, 'test@exam');
    // icon for confirming invalid input
    const checkIcon = screen.getByAltText('invalid input');
    expect(inputElement).toHaveValue('test@exam');
    expect(checkIcon).toBeInTheDocument();
    const errorElement = screen.getByText('invalid email');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('class', 'validation-error');
  });

  test('toggle password display', async () => {
    render(
      <InputWithError
        type="password"
        name="password"
        placeholder="Password"
        setFormData={jest.fn()}
        handleValidation={jest.fn(() => {
          throw new Error('invalid email');
        })}
      />
    );
    const user = userEvent.setup();
    const inputElement = screen.getByPlaceholderText(/password/i);
    // empty input no show/hide toggle
    expect(screen.queryByText(/show/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/hide/i)).not.toBeInTheDocument();
    await user.clear(inputElement);
    await user.type(inputElement, 'hello');
    // after input display show
    expect(screen.getByText(/show/i)).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
    await user.click(screen.getByText(/show/i));
    // after toggle display hide
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(screen.getByText(/hide/i)).toBeInTheDocument();
    expect(screen.queryByText(/show/i)).not.toBeInTheDocument();
    await user.clear(inputElement);
    expect(screen.queryByText(/hide/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/show/i)).not.toBeInTheDocument();
    await user.type(inputElement, 'h');
    // after clearing element last value of hide/show
    expect(screen.getByText(/hide/i)).toBeInTheDocument();
    expect(screen.queryByText(/show/i)).not.toBeInTheDocument();
    await user.click(screen.getByText(/hide/i));
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
