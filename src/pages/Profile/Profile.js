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

const Profile = ({ userData, handleUpdateUser }) => {
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
  // console.log(documents);
  // determine profile to display
  useEffect(() => {
    if (profileData) return;
    if (userName === userData.userName) {
      // users inspecting own profile
      setProfileData(userData);
      setProfileType('own');
      return;
    }

    const checkForUser = async () => {
      try {
        const user = await checkIfUserExists(userName);
        if (user === false) navigate('/');
        // find is friend or other
        const friend = await userData.following.find(
          friendUid => friendUid === user.uid
        );
        friend ? setProfileType('friend') : setProfileType('other');
        setProfileData(user);
      } catch (error) {
        console.log(error);
      }
    };

    checkForUser();
  }, [navigate, userName, userData, profileData, checkIfUserExists]);

  const handleFollowAccount = async () => {
    try {
      const ownAccFollowing = [...userData.following, profileData.uid];
      const inspectingAccFollowers = [...profileData.followers, userData.uid];

      await updateDocument(profileData.id, {
        followers: inspectingAccFollowers,
      });
      await handleUpdateUser(userData.id, { following: ownAccFollowing });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollowAccount = async () => {
    try {
      const ownAccFollowing = [...userData.following].filter(
        acc => acc !== profileData.uid
      );
      const inspectingAccFollowers = [...profileData.followers].filter(
        acc => acc !== userData.uid
      );
      console.log(ownAccFollowing, inspectingAccFollowers);
      await updateDocument(profileData.id, {
        followers: inspectingAccFollowers,
      });
      await handleUpdateUser(userData.id, { following: ownAccFollowing });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFollower = async (userId, userFollowing, docId) => {
    // user data is collected via FollowerList useCollectUsers hook
    try {
      const ownAccFollowing = [...userData.followers].filter(
        acc => acc !== userId
      );
      const inspectingAccFollowers = [...userFollowing].filter(
        acc => acc !== userData.uid
      );
      await updateDocument(docId, {
        following: inspectingAccFollowers,
      });
      await handleUpdateUser(userData.id, { followers: ownAccFollowing });
    } catch (error) {}
  };

  if (profileData === null || documents === null) return;

  return (
    <div className="Profile">
      <ProfileUser
        userData={userData}
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
