import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/Profile.css';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';

const Profile = ({ userData }) => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [postsCollection, setPostCollection] = useState(null);
  const { getDocument } = useFirestore('users');
  const { error, isPending, documents } = useCollection('posts');
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

  // if profile exist load posts
  useEffect(() => {
    if (!profileData) return;
    if (postsCollection) return;
    console.log('getting collection');
    setPostCollection([]);
  }, [profileData, postsCollection]);

  return <div>{userName === userData.userName ? 'GOOD' : 'BAD'}</div>;
};

export default Profile;
