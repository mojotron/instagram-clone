import { useState } from 'react';
import './styles/ChangeProfilePhoto.css';
import { useSetAvatar } from '../hooks/useSetAvatar';
// constants
import { MAX_AVATAR_IMAGE_SIZE } from '../constants/constants';

const ChangeProfilePhoto = ({ handleDisplay }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const { isPending, error, addAvatar, removeAvatar } = useSetAvatar();

  const handleUploadFile = e => {
    setUploadError(null);
    const file = e.target.files[0];
    if (file.size > MAX_AVATAR_IMAGE_SIZE) {
      setUploadError('File is to big (limit 500KB)');
      e.target.value = '';
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addAvatar(imageFile);
    handleDisplay();
  };

  const handleRemove = async () => {
    await removeAvatar();
    handleDisplay();
  };

  return (
    <div className="overlay">
      <div className="ChangeProfilePhoto">
        <h2>Change Profile Photo</h2>

        <form onSubmit={handleSubmit}>
          <input
            data-testid="file-input"
            type="file"
            onChange={handleUploadFile}
            accept="image/*"
          />
          {uploadError && (
            <p className="ChangeProfilePhoto__error">{uploadError}</p>
          )}
          {imageFile && (
            <button className="ChangeProfilePhoto__btn btn--blue" type="submit">
              Set New Image
            </button>
          )}
        </form>

        <button
          onClick={handleRemove}
          className="ChangeProfilePhoto__btn btn--red"
          type="button"
        >
          Remove Current Photo
        </button>

        <button
          onClick={handleDisplay}
          className="ChangeProfilePhoto__btn"
          type="button"
        >
          Cancel
        </button>

        {isPending && <p className="ChangeProfilePhoto__pending">Loading...</p>}
        {error && <p className="ChangeProfilePhoto__error">{error}</p>}
      </div>
    </div>
  );
};

export default ChangeProfilePhoto;
