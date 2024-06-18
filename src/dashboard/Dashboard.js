import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
 // Adjust this path if needed

import PropTypes from 'prop-types';
import Spinner from '../component/layout/Spinner';
import { deleteAccount, getCurrentProfile } from '../store/action/profile';
import DashboardAction from './DashboardAction';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';

export function Dashboard({deleteAccount, getCurrentProfile, auth:{user}, profile: { profile, loading } }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    
    loading && profile === null ? <Spinner /> :<> 
    
    <Fragment>Test

    <p className="lead"></p>
    {profile !==null ? <Fragment>
      <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome  {user && user.name}</p>

      <div className="dash-buttons">
          <Link to="/createProfile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i>CreateProfile
          </Link>
          </div>
      <DashboardAction />
      
      <Experience experience={profile.experience}/>
      <Education education={profile.education}/>
      <div className="my-2">
          <button onClick={(()=>deleteAccount())} className="btn btn-danger">
            <i className="fas fa-user-minus"></i> Delete My Accounts
          </button>
        </div>
      </section>
    </Fragment>:<Fragment>has not</Fragment>}
    </Fragment>
    
    </>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount:PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
