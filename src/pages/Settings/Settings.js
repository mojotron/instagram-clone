import { useState } from 'react';

const Settings = ({ userData }) => {
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
    <form className="authForm">
      <h2>Edit profile</h2>

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
  );
};

export default Settings;
