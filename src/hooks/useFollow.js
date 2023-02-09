import { useState, useEffect, useCallback } from 'react';
// hooks
import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';
import { useNotifications } from './useNotifications';

export const useFollow = () => {
  const { updateDocument } = useFirestore('users');
  const { response } = useUserDataContext();
  const { addNotification } = useNotifications();

  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const follow = useCallback(
    async (targetUID, targetFollowers) => {
      setIsPending(true);
      try {
        // get own following
        const ownAccountFollowing = [...response.document.following, targetUID];
        // get target followers
        const targetAccountFollowers = [
          ...targetFollowers,
          response.document.uid,
        ];
        // update both docks
        await updateDocument(response.document.uid, {
          following: ownAccountFollowing,
        });
        await updateDocument(targetUID, { followers: targetAccountFollowers });
        // add notifications to target acc that you follow him/her
        await addNotification(targetUID, null, 'follow-user');

        if (!isCancelled) {
          isPending(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setIsPending(false);
          setError(error.message);
        }
      }
    },
    [addNotification, isCancelled, isPending, response, updateDocument]
  );

  const unfollow = useCallback(
    async (targetUID, targetFollowers) => {
      setIsPending(true);
      try {
        // remove target uid from owner following
        const ownAccountFollowing = response.document.following.filter(
          item => item !== targetUID
        );
        // remove owner uid from target followers
        const targetAccountFollowers = targetFollowers.filter(
          item => item !== response.document.uid
        );

        await updateDocument(response.document.uid, {
          following: ownAccountFollowing,
        });
        await updateDocument(targetUID, { followers: targetAccountFollowers });

        if (!isCancelled) {
          isPending(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setIsPending(false);
          setError(error.message);
        }
      }
    },
    [response, isCancelled, isPending, updateDocument]
  );

  const removeFollower = useCallback(
    async (targetUID, targetFollowings) => {
      console.log('tf', targetFollowings);
      setIsPending(true);
      try {
        const ownAccountFollowers = [...response.document.followers].filter(
          acc => acc !== targetUID
        );
        const targetAccountFollowings = [...targetFollowings].filter(
          acc => acc !== response.document.uid
        );

        await updateDocument(response.document.uid, {
          followers: ownAccountFollowers,
        });
        await updateDocument(targetUID, { following: targetAccountFollowings });

        if (!isCancelled) {
          isPending(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setIsPending(false);
          setError(error.message);
        }
      }
    },
    [response, isCancelled, isPending, updateDocument]
  );

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, follow, unfollow, removeFollower };
};
