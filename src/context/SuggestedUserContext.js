import { createContext, useCallback, useMemo } from 'react';
import { useUserDataContext } from '../hooks/useUserDataContext';
import { useCollectDocsByIdList } from '../hooks/useCollectDocsByIdList';

export const SuggestedUserContext = createContext();

export const SuggestedUserContextProvider = ({ children }) => {
  const { response } = useUserDataContext();
  // 1. filter documents current user is not following back
  const followersNotFollowingBack = useMemo(() => {
    return response.document.followers.filter(
      follower => !response.document.following.includes(follower)
    );
  }, [response.document.followers, response.document.following]);
  // 2. get document of not following back users
  const { documents: notFollowingDocs } = useCollectDocsByIdList(
    followersNotFollowingBack,
    'users'
  );
  // get documents of all followings
  const { documents: followingDocs } = useCollectDocsByIdList(
    response.document.following,
    'users'
  );
  // 3. from those documents filter out users that followers are following
  const followersFollowings = useMemo(() => {
    if (!followingDocs) return null;
    return followingDocs.flatMap(user => {
      return [
        ...user.following.filter(
          userUid =>
            userUid !== response.document.uid &&
            !response.document.following.includes(userUid) &&
            !followersNotFollowingBack.includes(userUid)
        ),
      ];
    });
  }, [
    followingDocs,
    response.document.following,
    response.document.uid,
    followersNotFollowingBack,
  ]);
  // 4. get those users
  const { documents: followersFollowingDocs } = useCollectDocsByIdList(
    followersFollowings,
    'users'
  );

  const countFollowersFollowingAccount = useCallback(
    targetId => {
      return followingDocs
        .filter(doc => doc.following.includes(targetId))
        .map(doc => doc.userName);
    },
    [followingDocs]
  );

  return (
    <SuggestedUserContext.Provider
      value={{
        notFollowingBack: notFollowingDocs || [],
        followersFollowings:
          followersFollowingDocs?.map(doc => {
            return {
              ...doc,
              suggestedBy: countFollowersFollowingAccount(doc.id),
            };
          }) || [],
      }}
    >
      {children}
    </SuggestedUserContext.Provider>
  );
};
