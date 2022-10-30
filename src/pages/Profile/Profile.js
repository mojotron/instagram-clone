import { useState, useEffect } from 'react';
// react router
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
// styles
import './styles/Profile.css';
// components
import ProfileUser from './components/ProfileUser';
import FollowerList from './components/FollowerList';
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

  if (profileData === null || documents === null) return;

  return (
    <div className="Profile">
      <FollowerList type="following" userList={profileData.following} />

      <ProfileUser
        userData={profileData}
        accountType={profileType}
        postsCount={documents.length}
        handleFollowAccount={handleFollowAccount}
        handleUnfollowAccount={handleUnfollowAccount}
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
