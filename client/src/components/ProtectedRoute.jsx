import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('auth')) {
    return children; // Render the protected content if authenticated
  } else {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
