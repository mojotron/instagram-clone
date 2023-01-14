import { useState, useEffect } from 'react';
// react router
import { useParams, useNavigate } from 'react-router-dom';
// styles
import './styles/Profile.css';
// components
import ProfileUser from './components/ProfileUser';
//hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { useOnSnapshotDocument } from '../../hooks/useOnSnapshotDocument';
// icons
import { MdGridOn } from 'react-icons/md';
import { FiBookmark } from 'react-icons/fi';
import PostsCollectionTab from './components/PostsCollectionTab';

const Profile = () => {
  const { response } = useUserDataContext();
  const { searchForUser } = useSearchUsers();

  // TODO load
  const navigate = useNavigate();
  const { userName } = useParams();
  const { documentExist } = useFirestore('users');
  // can ne own, friend, other
  const [profileType, setProfileType] = useState(null);
  const [targetUserUID, setTargetUserUID] = useState(null);

  const [activeTab, setActiveTab] = useState('posts'); // posts or saved
  // call targetUser(non owner) if targetUserUID is non null, null brake useEffect in useOnSnapshot hooks
  const { isPending, error, document } = useOnSnapshotDocument(
    'users',
    targetUserUID
  );

  useEffect(() => {
    // if user inspecting other of friend acc and wants go back to own
    setProfileType(null);
    setTargetUserUID(null);
  }, [userName]);

  useEffect(() => {
    if (profileType) return;
    // first check if inspecting own profile page
    if (userName === response.document.userName) {
      // users inspecting own profile
      setProfileType('own');
      return;
    }
    //
    const checkForUser = async () => {
      console.log('checking for user');
      try {
        // check if userName exist (navigate to homepage if not)
        const userExist = await documentExist('public_usernames', userName);
        if (userExist === false) navigate('/');
        // get user document
        // TODO
        const userUID = await searchForUser(userName);
        // find is friend (following) or other (not following)
        const friend = await response.document.following.find(
          friendUid => friendUid === userUID
        );
        friend ? setProfileType('friend') : setProfileType('other');
        setTargetUserUID(userUID);
      } catch (error) {
        console.log(error);
      }
    };

    checkForUser();
  }, [
    profileType,
    navigate,
    userName,
    response,
    targetUserUID,
    documentExist,
    searchForUser,
  ]);

  if (profileType === null) return;
  if (profileType !== 'own' && document === null) return;

  return (
    <div className="Profile">
      <ProfileUser
        accountType={profileType}
        targetData={
          profileType === 'own'
            ? { response: { ...response } }
            : { response: { isPending, error, document } }
        }
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
          targetData={
            profileType === 'own'
              ? { response: { ...response } }
              : { response: { isPending, error, document } }
          }
        />
      </section>
    </div>
  );
};

export default Profile;
