import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const ProfileCreds = ({ experiences, educations }) => {
  return (
    <Fragment>
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'> Experience </h2>
        {experiences.length > 0 ? (
          <Fragment>
            {experiences.map((exp) => (
              <ProfileExperience key={exp._id} experience={exp} />
            ))}
          </Fragment>
        ) : (
          <h4>No Experience Credentials</h4>
        )}
      </div>
      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'> Education </h2>
        {educations.length > 0 ? (
          <Fragment>
            {educations.map((edu) => (
              <ProfileEducation key={edu._id} education={edu} />
            ))}
          </Fragment>
        ) : (
          <h4>No Education Credentials</h4>
        )}
      </div>
    </Fragment>
  );
};

ProfileCreds.propTypes = {
  experiences: PropTypes.array.isRequired,
  educations: PropTypes.array.isRequired,
};

export default ProfileCreds;
