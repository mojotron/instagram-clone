// hooks
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
  const { response, modals, closeModals } = useUserDataContext();
  const { screenSize } = useScreenSizeContext();

  return (
    <div
      className="Dashboard"
      style={{ flexDirection: screenSize === 'small' ? 'column' : 'row' }}
      onClick={closeModals}
    >
      {response.document && (
        <>
          {modals.openNotifications && <Notifications />}

          {modals.openCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost />
            </UserPostContextProvider>
          )}

          {screenSize !== 'small' && <Sidebar />}

          {screenSize === 'small' && <Header />}

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
              <Route path="/p/:postId" element={<Post />} />
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
