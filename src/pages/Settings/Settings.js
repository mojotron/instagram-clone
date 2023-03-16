// hooks
import { useState, useEffect } from 'react';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useSearchUsers } from '../../hooks/useSearchUsers';
// components
import Avatar from '../../components/Avatar';
import ChangeProfilePhoto from '../../components/ChangeProfilePhoto';
// styles
import './styles/Settings.css';
// utils
import {
  fullNameValidation,
  userNameValidation,
} from '../../utils/inputValidation';

const Settings = () => {
  const { createDocWithCustomID, deleteDocument, documentExist } =
    useFirestore('public_usernames');

  const { updateDocument } = useFirestore('users');

  const { response } = useUserDataContext();
  const { removeFromBucket, addToBucket } = useSearchUsers();

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

  // toggle change avatar popup
  const handleChangeAvatar = () => setChangeAvatar(oldValue => !oldValue);
  // toggle disable submit button if data is different from form input
  useEffect(() => {
    if (
      response.document.userName === formData.userName &&
      response.document.fullName === formData.fullName &&
      response.document.website === formData.website &&
      response.document.bio === formData.bio
    ) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [formData, response]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // changing user name needs to be checked
    setUsernameError(null);
    setFullNameError(null);
    try {
      if (formData.userName !== response.document.userName) {
        userNameValidation(formData.userName);
        const usernameExist = await documentExist(
          'public_usernames',
          formData.userName
        );

        if (usernameExist) {
          throw new Error('Username already exist, please try another one!');
        } else {
          // delete old public_usernames doc
          await deleteDocument(response.document.userName);
          // create new public_username doc
          await createDocWithCustomID(formData.userName, 'public_usernames', {
            userName: formData.userName,
          });
          // add new username to search_users bucket
          await addToBucket(formData.userName, response.document.uid);
          // remove old username from search_users bucket
          await removeFromBucket(response.document.userName);
        }
      }
      if (formData.fullName !== response.document.fullName) {
        fullNameValidation(formData.fullName);
      }
      // update user info
      await updateDocument(response.document.id, formData);
    } catch (err) {
      console.log(err.message);
      if (err.message === 'input full name, like "John Dow"') {
        setFullNameError(err.message);
      } else {
        setUsernameError(err.message);
      }
    }
  };

  return (
    <>
      {changeAvatar && (
        <ChangeProfilePhoto handleDisplay={handleChangeAvatar} />
      )}

      <form className="Settings" onSubmit={handleSubmit}>
        <h2 className="Settings__heading">Edit profile</h2>

        <section className="Settings__section">
          <div className="Settings__avatar">
            <Avatar
              size={38}
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
