import { useState, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// firebase
import { projectFirestore } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useCollectSuggestedUsers = () => {
  console.log('suggested users hook called');

  const { response } = useUserDataContext();

  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  const col = collection(projectFirestore, 'users');

  const notFollowingBack = response.document.followers.filter(
    follower => !response.document.following.includes(follower)
  );

  const getUsers = async userIds => {
    const q = query(col, where('uid', 'in', userIds));
    const usersSnapshot = await getDocs(q);
    const result = [];
    usersSnapshot.forEach(doc => {
      result.push({ ...doc.data() });
    });
    return result;
  };

  const getSuggestedUsers = async () => {
    // collect following user docs
    const getFollowers = await getUsers(response.document.following);
    // map over users and collect uids of user you don't follow
    console.log('1', getFollowers);
    // collect followings of your followings, filter out own account, account
    // that you already follow or accounts you don't follow back (they are separate
    // collection notFollowingBack array)
    const followersFollowing = getFollowers
      .map(user => ({
        user: user.userName,
        suggestions: user.following.filter(
          userUid =>
            userUid !== response.document.uid &&
            !response.document.following.includes(userUid) &&
            !notFollowingBack.includes(userUid)
        ),
      }))
      .flat()
      .reduce((acc, ele) => {}, []);
    console.log('2', followersFollowing);
  };

  return { documents, isPending, error, getSuggestedUsers };
};
