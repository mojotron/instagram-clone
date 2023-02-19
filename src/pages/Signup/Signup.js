import { useState, useRef } from 'react';
import InputWithError from '../../components/InputWithError';
import * as Validation from '../../utils/inputValidation';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: null,
    fullName: null,
    userName: null,
    password: null,
  });
  const [termsDisabled, setTermsDisabled] = useState(true);

  const usernameInputRef = useRef();

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
        // setup default data, user can update them on the settings page
        following: [], // user ids
        followers: [], // user ids
        posts: [], // post ids
        savedPosts: [], // post ids
        messages: [], // obj {messageTo: user uid, messageDocId: /messages/doc}
        avatar: { url: '', fileName: '' },
        bio: '',
        website: '',
        online: {
          status: true,
          lastLoggedOut: null,
        },
        newNotification: false,
      };
      try {
        await signup(formData.email, formData.password, userAccount);
      } catch (error) {
        if (
          error.message === 'Username already exist, please try another one!'
        ) {
          usernameInputRef.current.focus();
        }
      }
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
        reference={usernameInputRef}
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
        {!isPending ? 'Sign up' : 'Loading'}
      </button>

      {error && <p className="auth-error">{error}</p>}
    </form>
  );
};

export default Signup;
