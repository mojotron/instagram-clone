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
// temp
import TimeLinePost from '../Post/TimeLinePost';
import { useCollectPosts } from '../../hooks/useCollectPosts';
import { useEffect } from 'react';

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

          {showCreatePost && (
            <UserPostContextProvider>
              <CreateNewPost setShowCreatePost={setShowCreatePost} />
            </UserPostContextProvider>
          )}

          <Routes>
            <Route
              index
              element={
                <div>
                  {documents &&
                    documents.map(post => (
                      <TimeLinePost key={post.id} postData={post} />
                    ))}
                </div>
              }
            />
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
