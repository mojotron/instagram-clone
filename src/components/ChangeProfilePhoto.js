import { useState } from 'react';
import './styles/ChangeProfilePhoto.css';

const ChangeProfilePhoto = ({ handleDisplay }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // to do upload image to avatars
  // set link from avatars to user profile
  // delete image on vatars update image profils

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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(imageFile);
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
          <button className="ChangeProfilePhoto__btn btn--blue" type="submit">
            Set New Image
          </button>
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
      </div>
    </div>
  );
};

export default ChangeProfilePhoto;
