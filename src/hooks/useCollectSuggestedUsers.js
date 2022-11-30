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
      .flatMap(user => ({
        user: user.userName,
        suggestions: user.following.filter(
          userUid =>
            userUid !== response.document.uid &&
            !response.document.following.includes(userUid) &&
            !notFollowingBack.includes(userUid)
        ),
      }))
      .reduce((acc, ele) => {
        ele.suggestions.forEach(sug => {
          if (acc[sug]) {
            acc[sug] = [...acc[sug], ele.user];
          } else {
            acc[sug] = [ele.user];
          }
        });
        return acc;
      }, {});
    // return object, key is uid of suggested array, value is array
    // of all your friends that follow that account
    return followersFollowing;
  };

  const getSuggestedUsersDocuments = async () => {
    try {
      let getNotFollowingBack;
      let suggestedUsers;
      if (notFollowingBack.length > 0) {
        getNotFollowingBack = await getUsers(notFollowingBack);
      }

      const getSuggestedUids = await getSuggestedUsers();

      if (Object.keys(getSuggestedUids).length > 0) {
        suggestedUsers = await getUsers(Object.keys(getSuggestedUids));
        suggestedUsers.forEach(userObj => {
          userObj.suggestedBy = getSuggestedUids[userObj.uid];
        });
      }

      console.log(getNotFollowingBack);
      console.log(suggestedUsers);
    } catch (error) {}
  };

  return { documents, isPending, error, getSuggestedUsersDocuments };
};
