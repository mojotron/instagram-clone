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
import { useUserPostContext } from '../../hooks/useUserPostContext';
import { useStorage } from '../../hooks/useStorage';
import { useFirestore } from '../../hooks/useFirestore';
import { useUserDataContext } from '../../hooks/useUserDataContext';

const CreateNewPost = ({ setShowCreatePost }) => {
  const { response } = useUserDataContext();
  const { files, dimensions, imagesData, postInfo, currentStage } =
    useUserPostContext();
  const [showDiscard, setShowDiscard] = useState(false);
  //
  const { upload } = useStorage();
  const { addDocument } = useFirestore('posts');
  //
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleCloseBtn = () => {
    if (currentStage === 'choose-files') setShowCreatePost(false);
    setShowDiscard(true);
  };

  const handleCreatePost = async () => {
    if (isPending) return; // stop user to make additional call when create post starts
    setError(null);
    setIsPending(true);
    try {
      // upload images to the fire storage and create image object
      const images = [];
      for (const [i, file] of Object.entries([...files])) {
        const urlAndName = await upload('postImages', file);
        images.push({
          ...urlAndName,
          alt: imagesData[i].alt,
          filter: imagesData[i].filter,
          layers: imagesData[i].layers,
        });
      }
      // create document layout with image object and other data
      const post = {
        images,
        dimensions,
        ...postInfo,
        comments: [],
        likes: [],
        uid: response.document.uid,
        creator: {
          userName: response.document.userName,
          avatarUrl: response.document.avatar.url,
          profileDocId: response.document.id,
        },
      };
      // add document to post repo and close create post page
      await addDocument(post);
      setError(null);
      setIsPending(false);
      setShowCreatePost(false);
    } catch (error) {
      console.log('ERROR', error.message);
      setError('Connection lost, please try again later!');
      setIsPending(false);
    }
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
            <ImageInfoPanel
              handleCreatePost={handleCreatePost}
              error={error}
              isPending={isPending}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateNewPost;
