import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import InputWithError from '../../components/InputWithError';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { isPending, error, login } = useLogin();

  useEffect(() => {
    // toggle disable for login button
    if (formData.password.length < 8 || formData.email === '') {
      setBtnDisabled(true);
      return;
    } else {
      setBtnDisabled(false);
      return;
    }
  }, [formData]);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <h1>Instagram Clone</h1>
      <InputWithError
        type="email"
        name="email"
        placeholder="Email"
        setFormData={setFormData}
        handleValidation={null}
      />
      <InputWithError
        type="password"
        name="password"
        placeholder="Password"
        setFormData={setFormData}
        handleValidation={null}
      />

      <button
        className={`btn--auth ${btnDisabled ? 'gray' : ''}`}
        type="submit"
        disabled={btnDisabled}
      >
        {!isPending ? 'Log in' : 'Loading'}
      </button>

      {error && <p className="auth-error">{error}</p>}
    </form>
  );
};

export default Login;
