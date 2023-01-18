import { useState } from 'react';
// svg icons
import { GrClose } from 'react-icons/gr';
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
  const { response, updateDocument } = useUserDataContext();
  const { files, dimensions, imagesData, postInfo, currentStage } =
    useUserPostContext();
  const [showDiscard, setShowDiscard] = useState(false);
  //
  const { upload } = useStorage();
  const { addDocument, updateDocument: updatePost } = useFirestore('posts');
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
        creator: response.document.uid,
      };
      // add document to post repo and close create post page
      const postDocRef = await addDocument(post);
      // TODO add postDocID to user.posts
      const userPosts = [...response.document.posts, postDocRef.id];
      await updateDocument(response.document.uid, { posts: userPosts });
      // update doc with docID for useSnapshotByIdList hook
      await updatePost(postDocRef.id, { docId: postDocRef.id });
      //
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
          <GrClose size={20} />
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
