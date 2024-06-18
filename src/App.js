import './App.css';
import { Fragment } from 'react';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import { Provider } from 'react-redux';
import store from './store/store';
import Alert from './component/Alert';
import React, { useEffect } from 'react';
import { loadUser } from './store/action/auth';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import CreateProfile from './component/form-profile/CreateProfile';
import EditProfile from './component/form-profile/EditProfile';
import AddExperience from './component/form-profile/AddExperience';
import AddEducation from './component/form-profile/AddEducation';
import Profile1 from './component/profiles/Profile1';
import Profile from './component/profile/Profile';
const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/profiles' element={ <section className='container'><Profile1 /></section>} />

            <Route path='/login' element={ <section className='container'><Login /></section>} />
            <Route path='/register' element={ <section className='container'><Register /></section>} />
            {/* <Route path='/dashboard' element={ <section className='container'><Dashboard /></section>} /> */}
            <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/addExperience" element={<AddExperience />} />
          <Route path="/addEducation" element={<AddEducation />} />
          <Route path="/profile/:id" element={<section className='container'><Profile /></section>} />
        
        </Route>
            {/* Add more routes here */}
          </Routes>
        </Fragment>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
