import { useState } from 'react';
// svg icons
import closeIcon from '../../images/close-icon.svg';
// components
import FileUploadForm from './components/FileUploadForm';
import ImageSizePanel from './components/ImageSizePanel';
import ImageEditPanel from './components/ImageEditPanel';
import ImageInfoPanel from './components/ImageInfoPanel';
// style
import './styles/CreateNewPost.css';
import { FiltersAndLayersContextProvider } from '../../context/FiltersAndLayersContext';

const CreateNewPost = () => {
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
  console.log('image size data', imageSizeData);

  const handleSetSizeData = (aspectRatio, zoomLevel, position) => {
    console.log(aspectRatio, zoomLevel, position);
    alert();
    setImageSizeData({
      aspectRatio: aspectRatio,
      zoomLevel: zoomLevel,
      position: position,
    });
    setCurrentStage('filters-layers');
  };

  return (
    <FiltersAndLayersContextProvider>
      <div className="overlay">
        <button type="button" className="CreateNewPost__btn--close">
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
          {/* postSize,
        src,
        aspectRatio,
        zoomLevel,
        position,
        cssFilter,
        layers, */}
          {imageSizeData && currentStage === 'filters-layers' && (
            <ImageEditPanel
              imageData={{
                src: URL.createObjectURL(files[0]),
                aspectRatio: imageSizeData.aspectRatio,
                zoomLevel: imageSizeData.zoomLevel,
                position: imageSizeData.position,
              }}
            />
          )}
          {currentStage === 'caption-info' && (
            <ImageInfoPanel image={URL.createObjectURL(files[0])} />
          )}
        </div>
      </div>
    </FiltersAndLayersContextProvider>
  );
};

export default CreateNewPost;
