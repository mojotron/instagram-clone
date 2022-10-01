import { useState, useEffect, useRef } from 'react';
// hooks
import { useFirestore } from './useFirestore';
import { useStorage } from './useStorage';

export const useSetAvatar = (userId, handleDisplay) => {
  const [userUpdated, setUserUpdated] = useState(false);
  const [fileName, setFileName] = useState(null);

  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { response: storageResponse, upload, remove } = useStorage();
  const { updateDocument } = useFirestore('users');

  const updateUserAvatar = useRef(async (docId, data) =>
    updateDocument(docId, data)
  ).current;

  useEffect(() => {
    if (userUpdated) return;
    if (storageResponse.success === false) return;

    const updateData = fileName
      ? { url: storageResponse.imageUrls, fileName: fileName }
      : { url: '', fileName: '' };

    updateUserAvatar(userId, {
      avatar: updateData,
    })
      .then(() => {
        setUserUpdated(true);
        if (isCancelled) {
          setIsPending(false);
          setError(null);
        }
        // close popup passed from parent element
        handleDisplay();
      })
      .catch(error => {
        if (!isCancelled) {
          setIsPending(false);
          setError(error.message);
        }
      });
  }, [
    storageResponse,
    updateUserAvatar,
    userId,
    userUpdated,
    isCancelled,
    handleDisplay,
    fileName,
  ]);

  const addAvatar = async (file, userAvatarFileName) => {
    setFileName(null);
    setIsPending(true);
    setError(null);
    try {
      // delete current image from server to keep server clean
      if (userAvatarFileName !== '')
        await remove('avatars', userAvatarFileName);
      // add new file
      await upload('avatars', file);
      setFileName(file.name);
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        isPending(null);
      }
    }
  };

  const removeAvatar = async fileName => {
    setFileName(null);
    setIsPending(true);
    setError(null);
    try {
      await remove('avatars', fileName);
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        isPending(null);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, addAvatar, removeAvatar };
};
