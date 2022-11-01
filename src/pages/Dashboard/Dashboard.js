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

const Dashboard = () => {
  // get data
  const { response, updateDocument } = useUserDataContext();
  console.log('temp is -> ', response);

  // toggle create form page
  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleShowCreatePost = () => {
    setShowCreatePost(oldValue => !oldValue);
  };

  return (
    <div className="Dashboard">
      {response.document && (
        <>
          <Header
            userData={response.document}
            toggleShowCreatePost={toggleShowCreatePost}
          />

          {showCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost
                userData={response.document}
                setShowCreatePost={setShowCreatePost}
              />
            </UserPostContextProvider>
          )}

          <Routes>
            <Route index element={<h1>hello</h1>} />
            <Route
              path="/settings"
              // to do move to context
              element={<Settings userData={response.document} />}
            />
            <Route
              path="/:userName"
              element={<Profile handleUpdateUser={updateDocument} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Dashboard;
