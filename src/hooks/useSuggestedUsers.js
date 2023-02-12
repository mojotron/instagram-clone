import { useMemo } from 'react';
import { useCollectDocsByIdList } from './useCollectDocsByIdList';
import { useUserDataContext } from './useUserDataContext';

export const useSuggestedUsers = () => {
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
  // 3. from those documents filter out users that followers are following
  const followersFollowings = useMemo(() => {
    if (!notFollowingDocs) return null;
    return notFollowingDocs.flatMap(user => {
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
    response.document.following,
    response.document.uid,
    followersNotFollowingBack,
    notFollowingDocs,
  ]);
  // 4. get those users
  const { documents: followersFollowingDocs } = useCollectDocsByIdList(
    followersFollowings,
    'users'
  );

  return {
    notFollowingBack: notFollowingDocs,
    followersFollowings: followersFollowingDocs,
  };
};
