import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// context
import { useAuthContext } from './hooks/useAuthContext';
// context provider
import { UserDataContextProvider } from './context/UserDataContext';
// pages
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
// components
import AuthLink from './components/AuthLink';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute condition={user} goto="login">
                  <UserDataContextProvider>
                    <Dashboard />
                  </UserDataContextProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute condition={!user} goto="/">
                  <div className="AuthWrapper">
                    <Signup />
                    <AuthLink goto="/login" />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute condition={!user} goto="/">
                  <div className="AuthWrapper">
                    <Login />
                    <AuthLink goto="/signup" />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/login/reset"
              element={
                <ProtectedRoute condition={!user} goto="/">
                  <div className="AuthWrapper">
                    <ForgotPassword />
                  </div>
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
