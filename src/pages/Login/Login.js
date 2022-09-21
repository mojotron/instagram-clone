import { useEffect, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

  return (
    <form className="authForm">
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
        Log In
      </button>
    </form>
  );
};

export default Login;
