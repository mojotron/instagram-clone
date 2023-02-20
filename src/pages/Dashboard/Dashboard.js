// hooks
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserDataContext } from '../../hooks/useUserDataContext';
import { useScreenSizeContext } from '../../hooks/useScreenSizeContext';
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
  const { screenSize } = useScreenSizeContext();

  // toggle create form page
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotifications] = useState(false);

  const { setFixedSize } = useScreenSizeContext();

  const toggleShowCreatePost = () => {
    setShowCreatePost(oldValue => !oldValue);
  };

  const toggleNotifications = () => {
    setShowSearch(false);
    let fixedSize;
    setShowNotifications(oldValue => {
      fixedSize = oldValue;
      return !oldValue;
    });
    fixedSize ? setFixedSize(null) : setFixedSize('medium');
  };

  const toggleSearch = () => {
    setShowNotifications(false);
    let fixedSize;
    setShowSearch(oldValue => {
      fixedSize = oldValue;
      return !oldValue;
    });
    fixedSize ? setFixedSize(null) : setFixedSize('medium');
  };

  return (
    <div
      className="Dashboard"
      style={{ flexDirection: screenSize === 'small' ? 'column' : 'row' }}
    >
      {response.document && (
        <>
          {showNotification && (
            <Notifications toggleNotifications={toggleNotifications} />
          )}

          {showCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost setShowCreatePost={setShowCreatePost} />
            </UserPostContextProvider>
          )}

          {screenSize !== 'small' && (
            <Sidebar
              toggleShowCreatePost={toggleShowCreatePost}
              showNotification={showNotification}
              toggleNotifications={toggleNotifications}
              showSearch={showSearch}
              toggleSearch={toggleSearch}
            />
          )}
          {screenSize === 'small' && (
            <Header
              toggleShowCreatePost={toggleShowCreatePost}
              toggleNotifications={toggleNotifications}
              //
              showSearch={showSearch}
              toggleSearch={toggleSearch}
            />
          )}

          <div className="Dashboard__content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <TimeLine />
                    {screenSize === 'large' && <SuggestedUsers />}
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

          {screenSize === 'small' && <Footer />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
