import { useRef } from 'react';
// hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
// components
import Header from './components/Header';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Settings from '../Settings/Settings';

import './styles/Dashboard.css';

const Dashboard = () => {
  // get data
  const { user } = useAuthContext();
  const { response, getDocument } = useFirestore('users');

  const loadDocument = useRef(() => getDocument(user.uid)).current;

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  return (
    <div className="Dashboard">
      {response.document && (
        <>
          <Header userData={response.document} />
          <Routes>
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
