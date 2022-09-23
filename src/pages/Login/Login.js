import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <h1>Instagram Clone</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
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
