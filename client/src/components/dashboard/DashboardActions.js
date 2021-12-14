import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-primary'>
        <i class='fas fa-user-circle text-light'></i> Edit Profile
      </Link>
      <Link to='/add-experience' class='btn btn-primary'>
        <i class='fab fa-black-tie text-light'></i> Add Experience
      </Link>
      <Link to='/add-education' class='btn btn-primary'>
        <i class='fas fa-graduation-cap text-light'></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
