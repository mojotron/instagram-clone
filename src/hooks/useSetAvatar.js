import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';
import { useStorage } from './useStorage';

export const useSetAvatar = (userId, handleDisplay) => {
  const [userUpdated, setUserUpdated] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { response: storageResponse, upload } = useStorage();
  const { updateDocument } = useFirestore('users');

  const updateUserAvatar = useRef(async (docId, data) =>
    updateDocument(docId, data)
  ).current;

  useEffect(() => {
    console.log('effect');
    if (userUpdated) return;
    if (storageResponse.success === false) return;

    updateUserAvatar(userId, { avatarUrl: storageResponse.imageUrls })
      .then(() => {
        setUserUpdated(true);
        if (isCancelled) {
          setIsPending(false);
          setError(null);
        }
        // close popup
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
  ]);

  const addAvatar = async file => {
    setIsPending(true);
    setError(null);
    try {
      await upload('avatars', file);
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

  return { isPending, error, addAvatar };
};
