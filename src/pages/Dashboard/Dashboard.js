import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';
// components
import Header from './components/Header';
import Settings from '../Settings/Settings';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
import Profile from '../Profile/Profile';
// style
import './styles/Dashboard.css';
// context provider
import { UserPostContextProvider } from '../../context/UserPostContext';
import Post from '../Post/Post';

const Dashboard = () => {
  // get data
  const { response } = useUserDataContext();
  // toggle create form page
  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleShowCreatePost = () => {
    setShowCreatePost(oldValue => !oldValue);
  };

  return (
    <div className="Dashboard">
      {response.document && (
        <>
          <Header toggleShowCreatePost={toggleShowCreatePost} />

          {showCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost setShowCreatePost={setShowCreatePost} />
            </UserPostContextProvider>
          )}

          <Routes>
            <Route index element={<h1>hello</h1>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:userName" element={<Profile />} />
            <Route path="/p/:postId" element={<Post />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Dashboard;
