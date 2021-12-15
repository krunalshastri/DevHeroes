import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function handleOnChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    props.login(formData);
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
            <i class='fas fa-sign-in-alt'></i> Log in
          </h1>
          <p className='lead hide-sm'>
            <i className='fas fa-user'></i> Log into your account
          </p>
          <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={handleOnChange}
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
            <button className='btn btn-light' onClick={handleOnSubmit}>
              <i class='fas fa-sign-in-alt'></i> Login
            </button>
          </form>
          <p className='my-2'>
            Don't have an account?{' '}
            <Link to='/register' className='btn btn-primary'>
              <i class='fas fa-user-plus'></i> Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
