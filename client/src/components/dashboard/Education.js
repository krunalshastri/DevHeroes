import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>{edu.fieldofstudy}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School/College</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>Timeline</th>
            <th />
          </tr>
          {educations}
        </thead>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  educations: PropTypes.array.isRequired,
};

export default Education;
