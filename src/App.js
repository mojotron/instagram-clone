import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const context = useAuthContext();
  console.log(context);

  return (
    <div className="App">
      <p>instagram clone</p>
    </div>
  );
};

export default App;
