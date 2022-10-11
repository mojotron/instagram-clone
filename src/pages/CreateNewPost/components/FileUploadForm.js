import uploadPhotoIconBlack from '../../../images/upload-photo-icon-black.svg';
import uploadPhotoIconBlue from '../../../images/upload-photo-icon-blue.svg';
import { useRef, useState } from 'react';
import './styles/FileUploadForm.css';

import CreatePostHeader from './CreatePostHeader';

const FileUploadForm = ({ handleSetFiles }) => {
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
      console.log('setting files');
      handleSetFiles(e.dataTransfer.files);
    }
  };

  const handleChange = e => {
    if (e.target.files && e.target.files[0]) {
      handleSetFiles(e.target.files);
    }
  };

  return (
    <>
      <CreatePostHeader title="Create new post" />
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
        {/* prevent screen flickering */}
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
    </>
  );
};

export default FileUploadForm;
