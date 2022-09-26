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
// temp TODO move to nav
import { useLogout } from './hooks/useLogout';

const App = () => {
  const { authIsReady, user } = useAuthContext();
  // temp TODO move to nav
  const { logout } = useLogout();

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

          {/*TODO remove button to nav */}
          {user && (
            <button
              className="btn--auth"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          )}
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
