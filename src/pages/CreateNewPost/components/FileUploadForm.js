import uploadPhotoIconBlack from '../../../images/upload-photo-icon-black.svg';
import uploadPhotoIconBlue from '../../../images/upload-photo-icon-blue.svg';
import { useRef, useState } from 'react';
import './styles/FileUploadForm.css';

import CreatePostHeader from './CreatePostHeader';

import { useUserPostContext } from '../../../hooks/useUserPostContext';

const checkImageSize = fileList => {
  [...fileList].forEach(file => {
    if (file.size > 5000000) throw new Error('File size to big, limit 5MB');
  });
  return true;
};

const FileUploadForm = () => {
  const { setFiles, fileLimit, setCurrentStage } = useUserPostContext();

  const [error, setError] = useState(null);

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
    try {
      setError(null);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        if (e.dataTransfer.files.length > fileLimit)
          throw new Error('Maximum 3 images');
        setFiles(e.dataTransfer.files);
        setCurrentStage('set-dimensions');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = e => {
    try {
      setError(null);
      if (e.target.files && e.target.files[0]) {
        if (e.target.files.length > fileLimit)
          throw new Error('Maximum 3 images');
        checkImageSize(e.target.files);
        setFiles(e.target.files);
        setCurrentStage('set-dimensions');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <CreatePostHeader
        title="Create new post"
        btnText=""
        handleNext={null}
        handlePrev={null}
      />
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
            {error && <p className="error">{error}</p>}
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
