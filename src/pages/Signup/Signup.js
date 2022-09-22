import { useEffect, useState } from 'react';
import InputWithError from './InputWithError';
import * as Validation from '../../utils/inputValidation';
import { useSignup } from '../../hooks/useSignup';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: null,
    fullName: null,
    userName: null,
    password: null,
  });
  const [termsDisabled, setTermsDisabled] = useState(true);

  const { isPending, error, signup } = useSignup();

  const toggleTerms = () => {
    setTermsDisabled(oldValue => !oldValue);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      formData.email &&
      formData.fullName &&
      formData.userName &&
      formData.password
    ) {
      const userAccount = {
        userName: formData.userName,
        fullName: formData.fullName,
        emailAddress: formData.email,
        following: [],
        followers: [],
      };
      await signup(formData.email, formData.password, userAccount);
    }
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <h1>Instagram Clone</h1>
      <h2>Sign up to see photos and videos from your friends.</h2>

      <InputWithError
        type="email"
        name="email"
        placeholder="Email"
        setFormData={setFormData}
        handleValidation={Validation.emailValidation}
      />

      <InputWithError
        type="text"
        name="fullName"
        placeholder="Full Name"
        setFormData={setFormData}
        handleValidation={Validation.fullNameValidation}
      />
      <InputWithError
        type="text"
        name="userName"
        placeholder="Username"
        setFormData={setFormData}
        handleValidation={Validation.userNameValidation}
      />
      <InputWithError
        type="password"
        name="password"
        placeholder="Password"
        setFormData={setFormData}
        handleValidation={Validation.passwordValidation}
      />

      <p>
        By signing up, you agree to our Terms. This application is Instagram
        clone, made for learning purpose.
      </p>
      <p>
        Please use dummy data, your private data is used on your own
        responsibility.
      </p>

      <div className="authForm__terms">
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
        {isPending ? 'Loading' : 'Signup'}
      </button>
    </form>
  );
};

export default Signup;
