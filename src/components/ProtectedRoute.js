import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ condition, goto, children }) => {
  if (condition) {
    return children;
  } else {
    return <Navigate to={goto} />;
  }
};

export default ProtectedRoute;
