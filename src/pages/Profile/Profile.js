import { useState, useEffect } from 'react';
// react router
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// styles
import './styles/Profile.css';
// components
import Avatar from '../../components/Avatar';
import ChangeProfilePhoto from '../../components/ChangeProfilePhoto';

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
  const [profileData, setProfileData] = useState(null);

  const { getDocument } = useFirestore('users');

  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);

  const { documents } = useCollectPosts(profileData?.uid);

  console.log(documents);
  // determine profile to display
  useEffect(() => {
    if (profileData) return;
    if (userName === userData.userName) {
      // users inspecting own profile
      setProfileData(userData);
      return;
    }
    navigate('/');
  }, [navigate, userName, userData, profileData]);

  const toggleUpdateAvatar = () =>
    setShowChangeProfilePhoto(oldvalue => !oldvalue);

  if (documents === null) return;

  return (
    <div className="Profile">
      {showChangeProfilePhoto && (
        <ChangeProfilePhoto
          userId={profileData.uid}
          userAvatar={profileData.avatar}
          handleDisplay={toggleUpdateAvatar}
        />
      )}

      <section className="Profile__user">
        <div className="Profile__user__avatar" title="Change profile photo">
          <Avatar
            url={profileData.avatar.url}
            size="big"
            handleClick={toggleUpdateAvatar}
          />
        </div>
        <div className="Profile__user__info">
          <div>
            <h2>{profileData.userName}</h2>
            <button className="btn btn--profile">Edit profile</button>
          </div>
          <div>
            <p>
              <span>{documents.length}</span> posts
            </p>
            <p>
              <span>{profileData.followers.length}</span> followers
            </p>
            <p>
              <span>{profileData.following.length}</span> following
            </p>
          </div>
          <div>
            <p>{profileData.name}</p>
            <p>{profileData.bio}</p>
            <p>{profileData.website}</p>
          </div>
        </div>
      </section>

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
