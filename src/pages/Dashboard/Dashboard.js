import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useCollectPosts } from '../../hooks/useCollectPosts';
// components
import Header from './components/Header';
import Settings from '../Settings/Settings';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
import Profile from '../Profile/Profile';
import TimeLine from './components/TimeLine';
// style
import './styles/Dashboard.css';
// context provider
import { UserPostContextProvider } from '../../context/UserPostContext';
import Post from '../Post/Post';

const BRONTO_UID = 'ziNCOCmxVraTwN5EI1KeOXpP0mR2';

const Dashboard = () => {
  // get data
  const { response } = useUserDataContext();
  // toggle create form page
  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleShowCreatePost = () => {
    setShowCreatePost(oldValue => !oldValue);
  };
  // temp
  const { documents } = useCollectPosts(response.document?.uid);

  return (
    <div className="Dashboard">
      {response.document && (
        <>
          <Header toggleShowCreatePost={toggleShowCreatePost} />
          {documents && <TimeLine posts={documents} />}

          {showCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost setShowCreatePost={setShowCreatePost} />
            </UserPostContextProvider>
          )}

          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/:userName" element={<Profile />} />
            <Route path="/p/:postId" element={<Post type="regular" />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Dashboard;
