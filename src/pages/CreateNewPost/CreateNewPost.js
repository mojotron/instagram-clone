import { useState } from 'react';
// svg icons
import closeIcon from '../../images/close-icon.svg';
// components
import FileUploadForm from './components/FileUploadForm';
import ImageEditPanel from './components/ImageEditPanel';
// style
import './styles/CreateNewPost.css';

const CreateNewPost = () => {
  const [files, setFiles] = useState(null);
  const stage = 'Create New Post';

  console.log(files);

  return (
    <div className="overlay">
      <button type="button" className="CreateNewPost__btn--close">
        <img src={closeIcon} alt="close" />
      </button>

      <div data-testid="create-post" className="CreateNewPost">
        <header className="CreateNewPost__header">
          <h2>{stage}</h2>
        </header>
        {!files && <FileUploadForm setFiles={setFiles} />}
        {files && <ImageEditPanel image={files[0]} />}
      </div>
    </div>
  );
};

export default CreateNewPost;
