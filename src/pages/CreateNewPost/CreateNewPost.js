import { useState } from 'react';
// svg icons
import { GrClose } from 'react-icons/gr';
// components
import FileUploadForm from './components/FileUploadForm';
import ImageSizePanel from './components/ImageSizePanel';
import ImageEditPanel from './components/ImageEditPanel';
import ImageInfoPanel from './components/ImageInfoPanel';
import DiscardPost from './components/DiscardPost';
import CustomAlert from '../../components/CustomAlert';
// style
import './styles/CreateNewPost.css';
// hooks
import { useUserPostContext } from '../../hooks/useUserPostContext';
import { useStorage } from '../../hooks/useStorage';
import { useFirestore } from '../../hooks/useFirestore';
import { useUserDataContext } from '../../hooks/useUserDataContext';
// constants
import {
  MAX_POST_PER_USER,
  MAX_POST_COMMENTS_ALERT_MSG,
} from '../../constants/constants';

const CreateNewPost = () => {
  const { response, toggleModal } = useUserDataContext();
  const { files, dimensions, imagesData, postInfo, currentStage } =
    useUserPostContext();
  const [showDiscard, setShowDiscard] = useState(false);
  //
  const { upload } = useStorage();
  const { addDocument, updateDocument: updatePost } = useFirestore('posts');
  const { updateDocument: updateUserDoc } = useFirestore('users');
  //
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleCloseBtn = e => {
    if (currentStage === 'choose-files') toggleModal(e, 'openCreatePost');
    else setShowDiscard(true);
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
      // add postDocID to user.posts
      const userPosts = [postDocRef.id, ...response.document.posts];
      await updateUserDoc(response.document.uid, { posts: userPosts });
      // update doc with docID for useSnapshotByIdList hook
      await updatePost(postDocRef.id, { docId: postDocRef.id });
      //
      setError(null);
      setIsPending(false);
      toggleModal(null, 'openCreatePost');
    } catch (error) {
      console.log(error.message);
      setError('Connection lost, please try again later!');
      setIsPending(false);
    }
  };

  const maxPost = response.document.posts.length >= MAX_POST_PER_USER;

  return (
    <>
      {showDiscard && (
        <DiscardPost
          handleCancel={() => setShowDiscard(false)}
          handleDiscard={e => toggleModal(e, 'openCreatePost')}
        />
      )}

      <div className="overlay">
        <button
          type="button"
          className="CreateNewPost__btn--close"
          onClick={e => handleCloseBtn(e)}
        >
          <GrClose size={20} />
        </button>

        {maxPost && (
          <>
            <CustomAlert
              message={MAX_POST_COMMENTS_ALERT_MSG}
              handleClose={e => {
                toggleModal(e, 'openCreatePost');
              }}
            />
          </>
        )}

        {!maxPost && (
          <>
            <div
              className="CreateNewPost"
              // stop click propagation because of click outside modal option to close all modals
              onClick={e => e.stopPropagation()}
            >
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
          </>
        )}
      </div>
    </>
  );
};

export default CreateNewPost;
