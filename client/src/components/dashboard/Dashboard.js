import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'> Dashboard </h1>
      <div className='my-1'>
        <button
          className='btn-danger btn'
          onClick={() => props.deleteAccount()}
        >
          <i className='fas fa-user-minus'></i> Delete My Account
        </button>
      </div>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome,{' '}
        {props.auth.user && <i>{props.auth.user.name}</i>}
      </p>

      {!props.profile.loading &&
        (props.profile.profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={props.profile.profile.experience} />
            <Education education={props.profile.profile.education} />
          </Fragment>
        ) : (
          <Fragment>
            <p>You haven't added a profile yet.</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              {' '}
              Create Profile{' '}
            </Link>
          </Fragment>
        ))}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
