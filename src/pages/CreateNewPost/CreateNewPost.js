import { useState } from 'react';
// svg icons
import closeIcon from '../../images/close-icon.svg';
// components
import FileUploadForm from './components/FileUploadForm';
import ImageEditPanel from './components/ImageEditPanel';
// style
import './styles/CreateNewPost.css';
import { FiltersAndLayersContextProvider } from '../../context/FiltersAndLayersContext';

const CreateNewPost = () => {
  const [files, setFiles] = useState(null);
  const [filters, setFilters] = useState({
    brightness: null,
    contrast: null,
    saturation: null,
  });

  const [layers, setLayers] = useState({
    temperature: null,
    fade: null,
    vignette: null,
  });

  const stage = 'Create New Post';

  console.log(filters, layers);

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
          {files && (
            <ImageEditPanel
              image={files[0]}
              setFilters={setFilters}
              setLayers={setLayers}
            />
          )}
        </div>
      </div>
    </FiltersAndLayersContextProvider>
  );
};

export default CreateNewPost;
