import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import Spinner from '../layout/Spinner';
import { deleteAccount } from '../../actions/profile';

const ProfileById = ({
  getProfileById,
  deleteAccount,
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        profile === null ? (
          <div className='text-center'>
            <p className='text-center'>You haven't added a profile yet.</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              {' '}
              Create Profile{' '}
            </Link>
          </div>
        ) : (
          <Spinner />
        )
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            <i class='fas fa-arrow-circle-left'></i> Back To Profiles
          </Link>
          {auth.isAuth && !auth.loading && auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              <i class='fas fa-user-edit'></i> Edit Profile
            </Link>
          )}
          <button className='btn-danger btn' onClick={() => deleteAccount()}>
            <i className='fas fa-user-minus'></i> Delete My Account
          </button>
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCreds
              experiences={profile.experience}
              educations={profile.education}
              githubUsername={profile.githubusername}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileById.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteAccount })(
  ProfileById
);
