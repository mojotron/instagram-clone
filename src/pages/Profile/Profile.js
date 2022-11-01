import { useState, useEffect } from 'react';
// react router
import { useParams, useNavigate } from 'react-router-dom';
// styles
import './styles/Profile.css';
// components
import ProfileUser from './components/ProfileUser';
import PostCard from './components/PostCard';
//hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useCollectPosts } from '../../hooks/useCollectPosts';
// icons
import gridIcon from '../../images/grid-icon.svg';
import bookmarkIcon from '../../images/bookmark-icon.svg';
import { useUserDataContext } from '../../hooks/useUserDataContext';

const Profile = () => {
  const { response, updateDocument: handleUpdateUser } = useUserDataContext();

  const navigate = useNavigate();
  const { userName } = useParams();
  // can ne own, friend, other
  const [profileType, setProfileType] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // if user inspecting other of friend acc and wants go back to own
    setProfileType(null);
    setProfileData(null);
  }, [userName]);

  const { checkIfUserExists, updateDocument } = useFirestore('users');

  const { documents } = useCollectPosts(profileData?.uid);

  useEffect(() => {
    if (profileData) return;
    if (userName === response.document.userName) {
      // users inspecting own profile
      setProfileData(response.document);
      setProfileType('own');
      return;
    }

    const checkForUser = async () => {
      try {
        const user = await checkIfUserExists(userName);
        if (user === false) navigate('/');
        // find is friend or other
        const friend = await response.document.following.find(
          friendUid => friendUid === user.uid
        );
        friend ? setProfileType('friend') : setProfileType('other');
        setProfileData(user);
      } catch (error) {
        console.log(error);
      }
    };

    checkForUser();
  }, [navigate, userName, response, profileData, checkIfUserExists]);

  const handleFollowAccount = async (userId, userFollowers, docId) => {
    console.log(userFollowers);
    try {
      const ownAccFollowing = [...response.document.following, userId];
      const inspectingAccFollowers = [...userFollowers, response.document.uid];
      await updateDocument(docId, {
        followers: inspectingAccFollowers,
      });
      await handleUpdateUser(response.document.id, {
        following: ownAccFollowing,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollowAccount = async (userId, userFollowers, docId) => {
    try {
      const ownAccFollowing = [...response.document.following].filter(
        acc => acc !== userId
      );
      const inspectingAccFollowers = [...userFollowers].filter(
        acc => acc !== response.document.uid
      );
      console.log(ownAccFollowing, inspectingAccFollowers);
      await updateDocument(docId, {
        followers: inspectingAccFollowers,
      });
      await handleUpdateUser(response.document.id, {
        following: ownAccFollowing,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFollower = async (userId, userFollowing, docId) => {
    //user data is collected via FollowerList useCollectUsers hook
    try {
      const ownAccFollowing = [...response.document.followers].filter(
        acc => acc !== userId
      );
      const inspectingAccFollowers = [...userFollowing].filter(
        acc => acc !== response.document.uid
      );
      await updateDocument(docId, {
        following: inspectingAccFollowers,
      });
      await handleUpdateUser(response.document.id, {
        followers: ownAccFollowing,
      });
    } catch (error) {}
  };

  if (profileData === null || documents === null) return;

  return (
    <div className="Profile">
      <ProfileUser
        targetData={profileData}
        accountType={profileType}
        postsCount={documents.length}
        handlers={{
          follow: handleFollowAccount,
          unfollow: handleUnfollowAccount,
          remove: handleRemoveFollower,
        }}
      />

      <section className="Profile__collections">
        <div className="Profile__collections__tabs">
          <button className="btn btn--tab active">
            <img src={gridIcon} alt="posts collection" />
            <span>Posts</span>
          </button>
          <button className="btn btn--tab">
            <img src={bookmarkIcon} alt="saved collection" />
            <span>Saved</span>
          </button>
        </div>

        <div className="Profile__collections__showcase">
          {documents &&
            documents.map(ele => (
              <PostCard
                key={ele.id}
                imagesData={ele.images}
                dimensions={ele.dimensions}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
