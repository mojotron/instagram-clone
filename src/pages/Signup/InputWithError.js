import { useEffect, useState } from 'react';
import checkIcon from '../../images/circle-check.svg';
import cancelIcon from '../../images/circle-cancel.svg';
import './styles/InputWithError.css';

const InputWithError = ({
  type,
  name,
  placeholder,
  setFormData,
  handleValidation,
}) => {
  const [value, setValue] = useState('');
  const [validation, setValidation] = useState(null);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    if (validation === null) return;
    // update signup form data if validation is ok or to null if not
    if (validation) {
      setFormData(oldData => ({ ...oldData, [name]: value }));
    } else {
      setFormData(oldData => ({ ...oldData, [name]: null }));
    }
  }, [name, validation, value, setFormData]);

  const handleChange = e => {
    setValue(e.target.value);
    try {
      handleValidation(e.target.value);
      setValidationError(null);
      setValidation(true);
    } catch (error) {
      setValidationError(error.message);
      setValidation(false);
    }
  };

  return (
    <div className="InputWithError">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required
      ></input>
      {validationError && <p className="validation-error">{validationError}</p>}
      {validation && (
        <img className="validate-icon" src={checkIcon} alt="valid input" />
      )}

      {validationError && (
        <img className="validate-icon" src={cancelIcon} alt="invalid input" />
      )}
    </div>
  );
};

export default InputWithError;
