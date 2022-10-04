import { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
// components
import Header from './components/Header';
import Settings from '../Settings/Settings';
import CreateNewPost from '../CreateNewPost/CreateNewPost';
// style
import './styles/Dashboard.css';

const Dashboard = () => {
  // get data
  const { user } = useAuthContext();

  const { response, getDocument } = useFirestore('users');
  // toggle create form page
  const [showCreatePost, setShowCreatePost] = useState(false);

  const loadDocument = useRef(() => getDocument(user.uid)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

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
          {showCreatePost && <CreateNewPost />}
          <Routes>
            <Route index element={<h1>timeline</h1>} />
            <Route
              path="/settings"
              element={<Settings userData={response.document} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Dashboard;