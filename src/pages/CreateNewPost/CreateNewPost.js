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
// hooks
// import { useFiltersAndLayersContext } from '../../hooks/useFiltersAndLayersContext';
import { useUserPostContext } from '../../hooks/useUserPostContext';

const CreateNewPost = ({ userData, setShowCreatePost }) => {
  const { currentStage } = useUserPostContext();
  const [showDiscard, setShowDiscard] = useState(false);

  const handleCloseBtn = () => {
    if (currentStage === 'choose-files') setShowCreatePost(false);
    setShowDiscard(true);
  };

  return (
    <>
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
          onClick={handleCloseBtn}
        >
          <img src={closeIcon} alt="close" />
        </button>

        <div data-testid="create-post" className="CreateNewPost">
          {currentStage === 'choose-files' && <FileUploadForm />}

          {currentStage === 'set-dimensions' && <ImageSizePanel />}

          {currentStage === 'set-filter-layers' && <ImageEditPanel />}

          {currentStage === 'post-information' && (
            <ImageInfoPanel userData={userData} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateNewPost;
