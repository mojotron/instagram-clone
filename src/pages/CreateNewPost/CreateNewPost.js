import { useState } from 'react';
// svg icons
import closeIcon from '../../images/close-icon.svg';
// components
import FileUploadForm from './components/FileUploadForm';
import ImageSizePanel from './components/ImageSizePanel';
import ImageEditPanel from './components/ImageEditPanel';
// style
import './styles/CreateNewPost.css';
import { FiltersAndLayersContextProvider } from '../../context/FiltersAndLayersContext';

const CreateNewPost = () => {
  // stage 1 select image(s)
  const [files, setFiles] = useState(null);
  // stage 2 image size
  const [imageSize, setImageSize] = useState(null);
  // stage 3 filters and layers
  // stage 4 caption hashtags ats and location
  const stage = 'Create New Post';

  return (
    <FiltersAndLayersContextProvider>
      <div className="overlay">
        <button type="button" className="CreateNewPost__btn--close">
          <img src={closeIcon} alt="close" />
        </button>

        <div data-testid="create-post" className="CreateNewPost">
          <header className="CreateNewPost__header">
            <h2>{stage}</h2>
          </header>
          {!files && <FileUploadForm setFiles={setFiles} />}
          {files && !imageSize && (
            <ImageSizePanel image={URL.createObjectURL(files[0])} />
          )}

          {/* {files && <ImageEditPanel image={files[0]} />} */}
        </div>
      </div>
    </FiltersAndLayersContextProvider>
  );
};

export default CreateNewPost;
