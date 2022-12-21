import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';
// components
import Header from './components/Header';
import Settings from '../Settings/Settings';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
import Profile from '../Profile/Profile';
import TimeLine from './components/TimeLine';
import Post from '../Post/Post';
import AllSuggestedUsers from './components/AllSuggestedUsers';
import Explore from '../Explore/Explore';
// style
import './styles/Dashboard.css';
// context provider
import { UserPostContextProvider } from '../../context/UserPostContext';
import SuggestedUsers from './components/SuggestedUsers';
import { useEffect } from 'react';
import Messages from '../Messages/Messages';

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
            <Route
              path="/"
              element={
                <section className="Dashboard__main">
                  <TimeLine />
                  <SuggestedUsers />
                </section>
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:userName" element={<Profile />} />
            <Route path="/p/:postId" element={<Post type="regular" />} />
            <Route path="/explore/people" element={<AllSuggestedUsers />} />
            <Route path="/direct" element={<Messages />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Dashboard;
