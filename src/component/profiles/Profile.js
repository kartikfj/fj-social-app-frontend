import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllProfile } from '../../store/action/profile'
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItems';
export  function Profile({getAllProfile,profile:{profiles,loading}}) {
  useEffect(()=>{
    getAllProfile();
  },[])
  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};
Profile.prototype={
    getAllProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getAllProfile})(Profile)