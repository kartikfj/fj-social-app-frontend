import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { setAlert } from '../store/action/alert';

import PropTypes from 'prop-types';
import { register } from '../store/action/auth';
export  function Register({setAlert,register,isAuthenticated}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState(null);

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit =async (e) => {
    e.preventDefault();
    if (password !== password2) {
     setAlert('Passwords do nott matche','danger')
      setError('Passwords do not match');
      console.log('Passwords do not match');
    } else {
      register({ name, email, password });
      setError(null);
      // const newUser={
      //   name,
      //   email,
      //   password
      // }
      // try{
      //        const config={
      //           headers:{
      //             'Content-Type':'application/json'  
      //           }
      //        }
      //        const body=JSON.stringify(newUser);
      //        const res=await axios.post('/api/users/',body,config);
      //        console.log(res.data);

      // }catch(err){
      //   console.log(err.response.data);
      // }
      console.log(formData);
      
      // Handle registration logic here
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login" className="btn btn-light">Sign In</Link>
        </p>
      </section>
    </div>
  )
}

Register.prototype={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);