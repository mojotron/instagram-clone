import { useState } from 'react';
import Avatar from '../../components/Avatar';
import ChangeProfilePhoto from '../../components/ChangeProfilePhoto';
import './styles/Settings.css';

import {
  fullNameValidation,
  userNameValidation,
} from '../../utils/inputValidation';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../hooks/useUserDataContext';

const Settings = () => {
  const { response, updateDocument, checkIfUserExists } = useUserDataContext();

  const [changeAvatar, setChangeAvatar] = useState(false);
  const [fullNameError, setFullNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [formData, setFormData] = useState({
    fullName: response.document.fullName,
    userName: response.document.userName,
    website: response.document.website,
    bio: response.document.bio,
  });

  const navigate = useNavigate();

  const handleChangeAvatar = () => setChangeAvatar(oldValue => !oldValue);

  const handleChange = e => {
    if (submitDisabled) setSubmitDisabled(false);
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // changing user name needs to be checked
    setUsernameError(null);
    setFullNameError(null);
    try {
      if (formData.fullName !== response.document.fullName) {
        fullNameValidation(formData.fullName);
      }
      if (formData.userName !== response.document.userName) {
        userNameValidation(formData.userName);
        const usernameExist = await checkIfUserExists(formData.userName);
        if (usernameExist)
          throw new Error('Username already exist, please try another one!');
      }
      // update user info
      await updateDocument(response.document.id, formData);
      // navigate('/');
    } catch (err) {
      console.log(err.message);
      if (err.message === 'input full name, like "John Dow"') {
        setFullNameError(err.message);
      } else {
        setUsernameError(err.message);
      }
    }
    // navigate
  };
  return (
    <>
      {changeAvatar && (
        <ChangeProfilePhoto
          userId={response.document.id}
          userAvatar={response.document.avatar}
          handleDisplay={handleChangeAvatar}
        />
      )}

      <form className="Settings" onSubmit={handleSubmit}>
        <h2 className="Settings__heading">Edit profile</h2>

        <section className="Settings__section">
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              paddingRight: '20px',
            }}
          >
            <Avatar
              size="mid"
              url={response.document.avatar.url}
              handleClick={handleChangeAvatar}
            />
          </div>

          <div>
            <h1>{response.document.userName}</h1>
            <p className="Settings__link" onClick={handleChangeAvatar}>
              Change profile photo
            </p>
          </div>
        </section>

        <section className="Settings__section">
          <label htmlFor="full-name" className="Settings__heading">
            Name
          </label>
          <div>
            <input
              id="full-name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Name"
            />
            {fullNameError && <p className="error">{fullNameError}</p>}
            <p>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
            </p>
          </div>
        </section>

        <section className="Settings__section">
          <label htmlFor="user-name" className="Settings__heading">
            Username
          </label>
          <div>
            <input
              id="user-name"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
            />
            {usernameError && <p className="error">{usernameError}</p>}
            <p>Change your username.</p>
          </div>
        </section>

        <section className="Settings__section">
          <label htmlFor="website" className="Settings__heading">
            Website
          </label>
          <div>
            <input
              id="website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website"
              maxLength="75"
            />
            <p>Add your personal of business website.</p>
          </div>
        </section>

        <section className="Settings__section">
          <label htmlFor="bio" className="Settings__heading">
            Bio
          </label>
          <div>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Short Bio"
              maxLength="150"
            />
            <p data-testid="char-counter">{formData.bio.length}/150</p>
            <p>Write short description about you.</p>
          </div>
        </section>

        <button
          type="submit"
          className={`btn--auth ${submitDisabled ? 'gray' : ''}`}
          disabled={submitDisabled}
        >
          {response.isPending ? 'Loading' : 'Submit'}
        </button>
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </>
  );
};

export default Settings;
