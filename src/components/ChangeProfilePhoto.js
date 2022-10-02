import { useState } from 'react';
import './styles/ChangeProfilePhoto.css';
import { useSetAvatar } from '../hooks/useSetAvatar';

const ChangeProfilePhoto = ({ userId, userAvatar, handleDisplay }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const { isPending, error, addAvatar, removeAvatar } = useSetAvatar(
    userId,
    handleDisplay
  );

  const handleUploadFile = e => {
    setUploadError(null);
    const file = e.target.files[0];
    if (file.size > 2000000) {
      setUploadError('File is to big (limit 2MB)');
      e.target.value = '';
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addAvatar(imageFile, userAvatar.fileName);
  };

  const handleRemove = async () => {
    removeAvatar(userAvatar.fileName);
  };

  return (
    <div className="ChangeProfilePhoto__overlay">
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
