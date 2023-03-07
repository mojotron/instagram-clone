import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import InputWithError from '../../components/InputWithError';
import { Link } from 'react-router-dom';
import { TEST_ACCOUNT } from '../../constants/constants';

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

  const handleLogInAsTestAccount = async () => {
    await login(TEST_ACCOUNT.email, TEST_ACCOUNT.auth);
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
      {/* login as test account */}

      <button
        onClick={handleLogInAsTestAccount}
        className={`btn--auth`}
        type="button"
        style={{ backgroundColor: 'var(--green)', transform: 'scale(0.75)' }}
      >
        {!isPending ? 'Log is as Test Account' : 'Loading'}
      </button>
      <p>Inspect app without creating account. Please use it non malicious.</p>

      {error && <p className="auth-error">{error}</p>}

      <Link to="/login/reset">Forgot password?</Link>
    </form>
  );
};

export default Login;
