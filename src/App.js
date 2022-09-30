import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// context
import { useAuthContext } from './hooks/useAuthContext';
// pages
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
// components
import AuthLink from './components/AuthLink';
import ProtectedRoute from './components/ProtectedRoute';

//TODO
import Settings from './pages/Settings/Settings';
import { useFirestore } from './hooks/useFirestore';
import { useRef } from 'react';
import { useEffect } from 'react';

const App = () => {
  const { authIsReady, user } = useAuthContext();
  //temp
  const { response, getDocument } = useFirestore('users');
  const loadDocument = useRef(uid => getDocument(uid)).current;

  useEffect(() => {
    if (user === null) return;
    loadDocument(user.uid);
  }, [loadDocument, user]);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute condition={user} goto="login">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute condition={user} goto="login">
                  {response.document && (
                    <Settings userData={response.document} />
                  )}
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <ProtectedRoute condition={!user} goto="/">
                  <Signup />
                  <AuthLink goto="/login" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute condition={!user} goto="/">
                  <Login />
                  <AuthLink goto="/signup" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login/reset"
              element={
                <ProtectedRoute condition={!user} goto="/">
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
