import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  if (loading) return <div>Loading...</div>; // Optional: Add a loading state

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
