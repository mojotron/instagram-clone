import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/Signup/Signup';

const App = () => {
  const context = useAuthContext();
  console.log(context);

  return (
    <div className="App">
      <BrowserRouter>
        <p>instagram clone</p>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
