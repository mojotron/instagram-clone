import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { emailValidation } from '../../utils/inputValidation';
import InputWithError from '../../components/InputWithError';
import lockImg from '../../images/lock.svg';
import './styles/ForgotPassword.css';
import { usePasswordReset } from '../../hooks/usePasswordReset';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { isPending, error, passwordReset } = usePasswordReset();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      emailValidation(formData.email);
      setBtnDisabled(false);
    } catch (error) {
      setBtnDisabled(true);
    }
  }, [formData]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await passwordReset(formData.email);
    } catch (error) {
      console.log(error.message);
    }
    navigate('/login');
  };

  return (
    <form className="authForm ForgotPassword" onSubmit={handleSubmit}>
      <img className="ForgotPassword__img" src={lockImg} alt="closed lock" />
      <h1>Trouble Logging In?</h1>
      <h2>
        Enter your email and we'll send you a link to get back into your
        account.
      </h2>
      <InputWithError
        type="email"
        name="email"
        placeholder="Email"
        setFormData={setFormData}
        handleValidation={emailValidation}
      />
      <button
        className={`btn--auth ${btnDisabled ? 'gray' : ''}`}
        type="submit"
        disabled={btnDisabled}
      >
        {!isPending ? 'Send Login Link' : 'Loading'}
      </button>
      {error && <p className="auth-error">{error}</p>}
      <h2 id="separator">OR</h2>
      <Link className="ForgotPassword__link--signup" to="/signup">
        Create New Account
      </Link>
      <Link className="ForgotPassword__link--login" to="/login">
        Back To Login
      </Link>
    </form>
  );
};

export default ForgotPassword;
