import { useState, useEffect } from 'react';
import { useUserDataContext } from './useUserDataContext';
// firebase
import { projectFirestore } from '../firebase/config';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

export const useCollectSuggestedUsers = () => {
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
    const getFollowersFriends = await getUsers(response.document.following);
    // map over users and collect uids of user you don't follow
    const suggestedFriends = getFollowersFriends
      .map(user => {
        return user.following.filter(
          uid => !response.document.following.includes(uid)
        );
      })
      .flat();
    console.log(suggestedFriends);
  };

  // followers not followed back
  // friends of followers

  return { documents, isPending, error, getSuggestedUsers };
};
