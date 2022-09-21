import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import AuthLink from './components/AuthLink';

const App = () => {
  const context = useAuthContext();
  console.log(context);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthLink goto="signup" />
        <AuthLink goto="login" />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
