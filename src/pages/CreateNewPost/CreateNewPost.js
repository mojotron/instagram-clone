import './styles/CreateNewPost.css';
import closeIcon from '../../images/close-icon.svg';
import uploadPhotoIconBlack from '../../images/upload-photo-icon-black.svg';
import uploadPhotoIconBlue from '../../images/upload-photo-icon-blue.svg';
import { useRef, useState } from 'react';

const FileUploadForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
    }
  };

  return (
    <form className="FileUploadForm" onDragEnter={handleDrag}>
      <input
        ref={inputRef}
        type="file"
        accept=""
        required
        id="file-input"
        multiple={true}
        onChange={handleChange}
      />
      <label htmlFor="file-input" className="FileUploadForm__label">
        <div className="FileUploadForm__label-elements">
          <img
            src={dragActive ? uploadPhotoIconBlue : uploadPhotoIconBlack}
            alt="upload files"
          />
          <span>Drag photo and videos here.</span>
          <button
            type="button"
            className="btn--select-file"
            onClick={() => inputRef.current.click()}
          >
            Select from computer
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          className="drag-overlay"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

const CreateNewPost = () => {
  const stage = 'Create New Post';

  return (
    <div className="overlay">
      <button type="button" className="CreateNewPost__btn--close">
        <img src={closeIcon} alt="close" />
      </button>

      <div data-testid="create-post" className="CreateNewPost">
        <header className="CreateNewPost__header">
          <h2>{stage}</h2>
        </header>
        <FileUploadForm />
      </div>
    </div>
  );
};

export default CreateNewPost;
