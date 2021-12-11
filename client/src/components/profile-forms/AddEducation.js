import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = (props) => {
  return <div></div>;
};

addEducation.propTypes = {};

export default connect(null, { addEducation })(addEducation);
