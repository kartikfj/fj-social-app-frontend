import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../store/action/auth';

const Login = ({ login, isAuthenticate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      setError(null);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify({ email, password });
        const res = await axios.post('/api/auth/', body, config);
        console.log(res.data);

        login({ email, password });
      } catch (err) {
        console.log(err.response.data);
        setError('Invalid credentials');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticate) {
      navigate('/dashboard');
    }
  }, [isAuthenticate, navigate]);

  return (
    <div>
      <section className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticate: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticate: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
