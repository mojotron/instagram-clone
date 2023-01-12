import { useUserDataContext } from './useUserDataContext';
import { useFirestore } from './useFirestore';
import { useState } from 'react';

export const useFollow = () => {
  const { response: userDocResponse, updateDocument } = useFirestore('users');
  const { response } = useUserDataContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // const handleFollowAccount = async (userId, userFollowers, docId) => {
  //   console.log(userFollowers);
  //   try {
  //     const ownAccFollowing = [...response.document.following, userId];
  //     const inspectingAccFollowers = [...userFollowers, response.document.uid];
  //     await updateDocument(docId, {
  //       followers: inspectingAccFollowers,
  //     });
  //     await handleUpdateUser(response.document.id, {
  //       following: ownAccFollowing,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleUnfollowAccount = async (userId, userFollowers, docId) => {
  //   try {
  //     const ownAccFollowing = [...response.document.following].filter(
  //       acc => acc !== userId
  //     );
  //     const inspectingAccFollowers = [...userFollowers].filter(
  //       acc => acc !== response.document.uid
  //     );
  //     console.log(ownAccFollowing, inspectingAccFollowers);
  //     await updateDocument(docId, {
  //       followers: inspectingAccFollowers,
  //     });
  //     await handleUpdateUser(response.document.id, {
  //       following: ownAccFollowing,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleRemoveFollower = async (userId, userFollowing, docId) => {
  //   //user data is collected via FollowerList useCollectUsers hook
  //   try {
  //     const ownAccFollowing = [...response.document.followers].filter(
  //       acc => acc !== userId
  //     );
  //     const inspectingAccFollowers = [...userFollowing].filter(
  //       acc => acc !== response.document.uid
  //     );
  //     await updateDocument(docId, {
  //       following: inspectingAccFollowers,
  //     });
  //     await handleUpdateUser(response.document.id, {
  //       followers: ownAccFollowing,
  //     });
  //   } catch (error) {}
  // };

  const follow = async (targetUID, targetFollowers) => {
    try {
    } catch (error) {}
  };

  const unfollow = async (targetUID, targetFollowers) => {
    try {
    } catch (error) {}
  };

  const removeFollower = async (targetUID, targetFollowers) => {
    try {
    } catch (error) {}
  };

  return { isPending, error, follow, unfollow, removeFollower };
};
