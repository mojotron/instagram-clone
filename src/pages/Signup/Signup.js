import { useState } from 'react';
import './styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    userName: '',
    password: '',
  });
  const [termsDisabled, setTermsDisabled] = useState(true);

  const toggleTerms = () => {
    setTermsDisabled(oldValue => !oldValue);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  return (
    <form className="SignUp">
      <h1>Instagram Clone</h1>
      <h2>Sign up to see photos and videos from your friends.</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        value={formData.fullName}
      />
      <input
        type="text"
        name="userName"
        placeholder="Username"
        onChange={handleChange}
        value={formData.userName}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
      />

      <p>
        By signing up, you agree to our Terms. This application is Instagram
        clone, made for learning purpose.
      </p>
      <p>
        Please use dummy data, your private data is used on your own
        responsibility.
      </p>

      <div className="SignUp__terms">
        <label htmlFor="terms-and-conditions">Agree to Terms</label>
        <input
          type="checkbox"
          id="terms-and-conditions"
          onChange={toggleTerms}
        />
      </div>

      <button
        className={`btn--auth ${termsDisabled ? 'gray' : ''}`}
        type="submit"
        disabled={termsDisabled}
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
