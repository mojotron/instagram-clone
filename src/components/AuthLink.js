import './styles/AuthLink.css';
import { Link } from 'react-router-dom';

const AuthLink = ({ goto }) => {
  return (
    <div className="AuthLink">
      {goto === '/signup' && (
        <>
          <h3>Don't have an account?</h3>
          <Link to="/signup">Sign up</Link>
        </>
      )}
      {goto === '/login' && (
        <>
          <h3>Have an account?</h3>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
};

export default AuthLink;
