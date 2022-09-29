import { useState } from 'react';
import Avatar from '../../components/Avatar';
import ChangeProfilePhoto from '../../components/ChangeProfilePhoto';

const Settings = ({ userData }) => {
  const [changeAvatar, setChangeAvatar] = useState(false);
  const handleChangeAvatar = () => setChangeAvatar(oldValue => !oldValue);

  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    userName: userData.userName,
    website: userData.website,
    bio: userData.bio,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };
  // changing user name needs to be checked
  return (
    <>
      {changeAvatar && (
        <ChangeProfilePhoto
          userId={userData.id}
          handleDisplay={handleChangeAvatar}
        />
      )}
      <form className="authForm">
        <h2>Edit profile</h2>
        <Avatar
          size="mid"
          url={userData.avatarUrl}
          handleClick={handleChangeAvatar}
        />

        <label htmlFor="full-name">Name</label>
        <input
          id="full-name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Name"
        />

        <label htmlFor="user-name">Username</label>
        <input
          id="user-name"
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Username"
        />

        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="userName"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Short Bio"
        />
      </form>
    </>
  );
};

export default Settings;
