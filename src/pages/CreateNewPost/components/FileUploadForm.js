import { useRef, useState } from 'react';
// style
import './styles/FileUploadForm.css';
// icons
import { IoMdImages } from 'react-icons/io';
// components
import CreatePostHeader from './CreatePostHeader';
// context
import { useUserPostContext } from '../../../hooks/useUserPostContext';
// utility helpers
import filesCheck from '../../../utils/filesCheck';

const FileUploadForm = () => {
  const { setFiles } = useUserPostContext();

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
        filesCheck(e.dataTransfer.files);
        setFiles(e.dataTransfer.files);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = e => {
    try {
      setError(null);
      if (e.target.files && e.target.files[0]) {
        filesCheck(e.target.files);
        setFiles(e.target.files);
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
          accept="image/*"
          required
          id="file-input"
          multiple={true}
          onChange={handleChange}
        />
        <label htmlFor="file-input" className="FileUploadForm__label">
          <div className="FileUploadForm__label-elements">
            <IoMdImages
              size={100}
              color={dragActive ? 'var(--blue)' : 'var(--black)'}
            />
            <span>Drag photos here.</span>
            <button
              type="button"
              className="btn--select-file"
              onClick={e => {
                e.stopPropagation();
                inputRef.current.click();
              }}
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
