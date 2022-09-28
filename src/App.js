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
import ChangeProfilePhoto from './components/ChangeProfilePhoto';
import { useState } from 'react';

const App = () => {
  const { authIsReady, user } = useAuthContext();
  //temp
  const [showChangeProfilePhoto, setShowChangeProfilePhoto] = useState(false);
  const handleDisplay = () => setShowChangeProfilePhoto(oldValue => !oldValue);
  return (
    <div className="App">
      <button onClick={handleDisplay}>Show</button>
      {showChangeProfilePhoto && (
        <ChangeProfilePhoto handleDisplay={handleDisplay} />
      )}

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
                  <Settings
                    userData={{
                      userName: '_jd_',
                      fullName: 'John Dow',
                      emailAddress: 'johndow@example.com',
                      avatarUrl: '',
                      bio: '',
                      website: '',
                    }}
                  />
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
