import { useState } from 'react';
// svg icons
import closeIcon from '../../images/close-icon.svg';
// components
import FileUploadForm from './components/FileUploadForm';
import ImageSizePanel from './components/ImageSizePanel';
import ImageEditPanel from './components/ImageEditPanel';
import ImageInfoPanel from './components/ImageInfoPanel';
import DiscardPost from './components/DiscardPost';
// style
import './styles/CreateNewPost.css';
import { FiltersAndLayersContextProvider } from '../../context/FiltersAndLayersContext';
import { useFiltersAndLayersContext } from '../../hooks/useFiltersAndLayersContext';

const CreateNewPost = ({ userData, setShowCreatePost }) => {
  const [showDiscard, setShowDiscard] = useState(false);
  const [currentStage, setCurrentStage] = useState('load-files');
  // stage 1 select image(s)
  const [files, setFiles] = useState(null);
  // stage 2 image size
  const [imageSizeData, setImageSizeData] = useState(null);
  // stage 3 filters and layers

  // stage 4 caption hashtags ats and location
  const handleSetFiles = files => {
    setFiles(files);
    setCurrentStage('size-position');
  };

  const handleSetSizeData = (aspectRatio, zoomLevel, position) => {
    setImageSizeData({ aspectRatio, zoomLevel, position });
    setCurrentStage('filters-layers');
  };

  return (
    <FiltersAndLayersContextProvider>
      {showDiscard && (
        <DiscardPost
          handleCancel={() => setShowDiscard(false)}
          handleDiscard={() => setShowCreatePost(false)}
        />
      )}

      <div className="overlay">
        <button
          type="button"
          className="CreateNewPost__btn--close"
          onClick={() => setShowDiscard(true)}
        >
          <img src={closeIcon} alt="close" />
        </button>

        <div data-testid="create-post" className="CreateNewPost">
          {currentStage === 'load-files' && (
            <FileUploadForm handleSetFiles={handleSetFiles} />
          )}
          {currentStage === 'size-position' && (
            <ImageSizePanel
              image={URL.createObjectURL(files[0])}
              handleSetSizeData={handleSetSizeData}
            />
          )}
          {currentStage === 'filters-layers' && (
            <ImageEditPanel
              src={URL.createObjectURL(files[0])}
              aspectRatio={imageSizeData.aspectRatio}
              zoomLevel={imageSizeData.zoomLevel}
              position={imageSizeData.position}
              setCurrentStage={setCurrentStage}
            />
          )}
          {currentStage === 'caption-info' && (
            <ImageInfoPanel
              postData={{
                src: URL.createObjectURL(files[0]),
                aspectRatio: imageSizeData.aspectRatio,
                zoomLevel: imageSizeData.zoomLevel,
                position: imageSizeData.position,
              }}
              userData={userData}
            />
          )}
        </div>
      </div>
    </FiltersAndLayersContextProvider>
  );
};

export default CreateNewPost;
