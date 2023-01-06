import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// hooks
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
// components
import Header from './components/Header';
import Settings from '../Settings/Settings';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
import Profile from '../Profile/Profile';
import TimeLine from './components/TimeLine';
import Post from '../Post/Post';
import AllSuggestedUsers from './components/AllSuggestedUsers';
import Explore from '../Explore/Explore';
import SuggestedUsers from './components/SuggestedUsers';
import Messages from '../Messages/Messages';
import Notifications from '../Notifications/Notifications';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
// style
import './styles/Dashboard.css';
// context provider
import { UserPostContextProvider } from '../../context/UserPostContext';

const Dashboard = () => {
  // get data
  const { response } = useUserDataContext();
  // toggle create form page
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showNotification, setShowNotifications] = useState(false);
  // screen size
  const small = useMediaQuery('(max-width: 770px)');
  const large = useMediaQuery('(min-width: 1280px)');

  const determineScreenSize = () => {
    if (small) return 'small';
    if (large) return 'large';
    return 'medium';
  };

  const screenSize = determineScreenSize();

  const toggleShowCreatePost = () => {
    setShowCreatePost(oldValue => !oldValue);
  };

  const toggleNotifications = () => {
    setShowNotifications(oldValue => !oldValue);
  };

  return (
    <div
      className="Dashboard"
      style={{ flexDirection: screenSize === 'small' ? 'column' : 'row' }}
    >
      {response.document && (
        <>
          {showNotification && <Notifications />}

          {showCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost setShowCreatePost={setShowCreatePost} />
            </UserPostContextProvider>
          )}
          {/* 
            large/medium
            sidebar - heading, navbar, searchbar
            main - dynamic content

            small
            header - heading, search bar, notifications
            main - dynamic content
            footer - navbar
          */}

          {screenSize !== 'small' && <Sidebar screenSize={screenSize} />}
          {screenSize === 'small' && (
            <Header
              screenSize={screenSize}
              toggleShowCreatePost={toggleShowCreatePost}
              toggleNotifications={toggleNotifications}
            />
          )}

          <div className="Dashboard__content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <TimeLine />
                    {large && <SuggestedUsers />}
                  </>
                }
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/:userName" element={<Profile />} />
              <Route path="/p/:postId" element={<Post type="regular" />} />
              <Route path="/explore/people" element={<AllSuggestedUsers />} />
              <Route path="/direct" element={<Messages />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
          </div>

          {screenSize === 'small' && <Footer screenSize={screenSize} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
