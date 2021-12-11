import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggletoDateDisabled] = useState(false);
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  let history = useHistory();
  function handleOnSubmit(event) {
    event.preventDefault();
    addEducation(formData, history);
  }

  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-graduation-cap'></i> Add any school/college that you
        have attended
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={(e) => handleOnSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School/College'
            name='school'
            value={school}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree/Certificate'
            name='degree'
            value={degree}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggletoDateDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School/College
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => handleOnChange(e)}
            disabled={toDateDisabled}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Course Description'
            value={description}
            onChange={(e) => handleOnChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <a class='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

addEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
