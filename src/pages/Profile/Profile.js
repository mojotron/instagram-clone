import { useState, useEffect } from 'react';
// react router
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// styles
import './styles/Profile.css';
// components
import ProfileUser from './components/ProfileUser';
import PostsCollectionTab from './components/PostsCollectionTab';
//hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
// icons
import { MdGridOn } from 'react-icons/md';
import { FiBookmark } from 'react-icons/fi';

const Profile = () => {
  // for MoreOption component direct link to saved posts
  const location = useLocation();
  // const locationHasState = location.state?.activeTab;

  const { userName } = useParams(); // get userName from web address parameter
  const navigate = useNavigate();
  const { documentExist } = useFirestore('users');
  const { response } = useUserDataContext();
  const { searchForUser } = useSearchUsers();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || 'posts'
  ); // =>posts or saved

  const [profileType, setProfileType] = useState(null); // => own, friend or other
  // if account user inspect is not his own save targetUID for hook to get user data
  const [targetUserUID, setTargetUserUID] = useState(null);
  // targetUserUID null value exist useEffect in useOnSnapshot hooks before getting data
  const { document } = useOnSnapshotDocument('users', targetUserUID);

  const [error, setError] = useState(null);

  // if user inspecting other of friend acc and wants go back to own => reset
  useEffect(() => {
    setProfileType(null);
    setTargetUserUID(null);
    setActiveTab(location.state?.activeTab || 'posts');
  }, [location, userName]);

  // main logic for determining who's account current user is inspecting
  useEffect(() => {
    if (profileType) return; // breaks useEffect if profileType already determined
    // first check if inspecting own profile page
    if (userName === response.document.userName) {
      // users inspecting own profile
      setProfileType('own');
      return;
    }
    // if user is not current user
    const checkForUser = async () => {
      try {
        // check if userName exist (navigate to homepage if not)
        const userExist = await documentExist('public_usernames', userName);
        if (userExist === false) navigate('/');
        // get user ID
        const userUID = await searchForUser(userName);
        // find is friend (following) or other (not following)
        const isFriend = await response.document.following.find(
          friendUid => friendUid === userUID
        );
        isFriend ? setProfileType('friend') : setProfileType('other');
        setTargetUserUID(userUID);
      } catch (error) {
        console.log(error);
        setError('Something went wrong, please try again later!');
      }
    };

    checkForUser();
  }, [
    userName,
    navigate,
    response,
    profileType,
    targetUserUID,
    documentExist,
    searchForUser,
  ]);

  if (error) return <p className="error">{error}</p>;
  if (profileType === null) return;
  if (profileType !== 'own' && document === null) return;

  return (
    <div className="Profile">
      <ProfileUser
        profileType={profileType}
        targetData={profileType === 'own' ? response.document : document}
        setProfileType={setProfileType}
      />
      {/* TABS */}
      <section className="Profile__collections">
        <div className="Profile__collections__tabs">
          <button
            className={`btn btn--tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <MdGridOn size={15} />
            <span>Posts</span>
          </button>

          {profileType === 'own' && (
            <button
              className={`btn btn--tab ${
                activeTab === 'saved' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <FiBookmark size={15} />
              <span>Saved</span>
            </button>
          )}
        </div>

        <PostsCollectionTab
          collectionType={activeTab}
          targetData={profileType === 'own' ? response.document : document}
        />
      </section>
    </div>
  );
};

export default Profile;
