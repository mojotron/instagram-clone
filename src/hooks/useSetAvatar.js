// hooks
import { useState, useEffect, useCallback } from 'react';
import { useStorage } from './useStorage';
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';

export const useSetAvatar = () => {
  const { response } = useUserDataContext();
  const { updateDocument } = useFirestore('users');
  const { upload, remove } = useStorage();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const addAvatar = useCallback(
    async file => {
      setIsPending(true);
      setError(null);
      try {
        // clean old image if there is one
        if (response.document.avatar.url !== '') {
          await remove(response.document.avatar.fileName);
        }
        const snapshot = await upload('avatars', file);
        await updateDocument(response.document.id, { avatar: { ...snapshot } });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setIsPending(false);
          setError(error.message);
        }
      }
    },
    [response, isCancelled, remove, updateDocument, upload]
  );

  const removeAvatar = useCallback(async () => {
    setIsPending(true);
    setError(null);
    try {
      if (response.document.avatar.fileName !== '') {
        await remove(response.document.avatar.fileName);
        await updateDocument(response.document.id, {
          avatar: { fileName: '', url: '' },
        });
      }
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsPending(false);
        setError(error.message);
      }
    }
  }, [isCancelled, remove, response, updateDocument]);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, addAvatar, removeAvatar };
};
