import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// context
import { useAuthContext } from './hooks/useAuthContext';
// pages
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
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
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute condition={user} goto="login">
                  {<h1>Temp home page</h1>}
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
            <Route path="/login/reset" element={<ForgotPassword />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
