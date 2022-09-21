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
});
