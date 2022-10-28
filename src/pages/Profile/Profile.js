import { useState, useEffect } from 'react';
// react router
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
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

const Profile = ({ userData }) => {
  const navigate = useNavigate();
  const { userName } = useParams();
  console.log(userName);
  // can ne own, friend, other
  const [profileType, setProfileType] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const { checkIfUserExists, getDocument } = useFirestore('users');

  const { documents } = useCollectPosts(profileData?.uid);

  console.log(documents);
  // determine profile to display
  useEffect(() => {
    if (profileData) return;
    if (userName === userData.userName) {
      // users inspecting own profile
      setProfileData(userData);
      setProfileType('own');
      return;
    }
    checkIfUserExists(userName);

    navigate('/');
  }, [navigate, userName, userData, profileData, checkIfUserExists]);

  if (documents === null) return;

  return (
    <div className="Profile">
      <ProfileUser
        userData={profileData}
        accountType={profileType}
        postsCount={documents.length}
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
