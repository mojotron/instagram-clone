import { useState } from 'react';
import Avatar from '../../components/Avatar';
import ChangeProfilePhoto from '../../components/ChangeProfilePhoto';
import './styles/Settings.css';

import { userNameValidation } from '../../utils/inputValidation';
import { useFirestore } from '../../hooks/useFirestore';

const Settings = ({ userData }) => {
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [usernameError, setUsernameError] = useState();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    userName: userData.userName,
    website: userData.website,
    bio: userData.bio,
  });

  const { isPending, error, checkIfUserExists, updateDocument } =
    useFirestore('users');

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
    try {
      if (formData.userName !== userData.userName) {
        const usernameExist = await checkIfUserExists(formData.userName);
        if (usernameExist)
          throw new Error('Username already exist, please try another one!');
        userNameValidation(formData.userName);
        // update user info
        await updateDocument(userData.id, formData);
      }
    } catch (err) {
      console.log(err.message);
      setUsernameError(err.message);
    }
    // navigate
  };
  return (
    <>
      {changeAvatar && (
        <ChangeProfilePhoto
          userId={userData.id}
          userAvatar={userData.avatar}
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
              url={userData.avatar.url}
              handleClick={handleChangeAvatar}
            />
          </div>

          <div>
            <h1>{userData.userName}</h1>
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
          {isPending ? 'Loading' : 'Submit'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default Settings;
