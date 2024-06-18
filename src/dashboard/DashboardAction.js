import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardAction() {
  return (
    <div>
      <section className="container">
       
        <div className="dash-buttons">
          <Link to="/editProfile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>
          <Link to="/addExperience" className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
          </Link>
          <Link to="/addEducation" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
          </Link>
        </div>

  

        {/* <div className="my-2">
          <button className="btn btn-danger">
            <i className="fas fa-user-minus"></i> Delete My Account
          </button>
        </div> */}
      </section>
    </div>
  );
}
