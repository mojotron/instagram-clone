import { useState } from 'react';
import './styles/ChangeProfilePhoto.css';
import { useSetAvatar } from '../hooks/useSetAvatar';

const ChangeProfilePhoto = ({ userId, handleDisplay }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const { isPending, error, addAvatar } = useSetAvatar(userId, handleDisplay);

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
    await addAvatar(imageFile);
  };

  return (
    <div className="ChangeProfilePhoto__overlay">
      <div className="ChangeProfilePhoto">
        <h2>Change Profile Photo</h2>

        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleUploadFile} accept="image/*" />
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
          onClick={() => console.log('Remove pic')}
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

        {isPending && (
          <p style={{ fontSize: '16px', paddingBottom: '10px' }}>Loading...</p>
        )}
        {error && <p className="ChangeProfilePhoto__error">{error}</p>}
      </div>
    </div>
  );
};

export default ChangeProfilePhoto;
