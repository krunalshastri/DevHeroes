import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  function handleOnChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    if (password !== password2)
      props.setAlert('Passwords do not match!', 'danger');
    else props.register({ name, email, password });
  }

  if (props.isAuth) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='register'>
      <div className='dark-overlay-register'>
        <div className='register-inner'>
          <Alert />
          <h1 className='large text-light'>
            {' '}
            <i class='fas fa-user-plus'></i> Sign Up
          </h1>
          <p className='lead hide-sm'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={handleOnChange}
                required
              />
              <small className='form-text hide-sm'>
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                minLength='4'
                value={password}
                onChange={handleOnChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                minLength='4'
                value={password2}
                onChange={handleOnChange}
              />
            </div>
            <button
              to='/register'
              className='btn btn-primary'
              onClick={handleOnSubmit}
            >
              <i class='fas fa-user-plus'></i> Sign Up
            </button>
          </form>
          <p className='my-2'>
            Already have an account?{' '}
            <Link to='/login' className='btn btn-light'>
              <i class='fas fa-sign-in-alt'></i> Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
