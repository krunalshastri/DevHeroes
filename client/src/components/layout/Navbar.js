import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = (props) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          {' '}
          <i class='fas fa-users'></i>{' '}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          {' '}
          <i class='fas fa-user-plus'></i>{' '}
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          {' '}
          <i class='fas fa-sign-in-alt'></i>{' '}
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );

  function handleOnClick() {
    props.logout();
  }

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          {' '}
          <i class='fas fa-users'></i>{' '}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          {' '}
          <i class='fas fa-comment'></i> <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          {' '}
          <i class='fas fa-clipboard-list'></i>{' '}
          <span className='hide-sm'>Dashboard </span>{' '}
        </Link>
      </li>
      <li>
        <Link to={`/profiles/${props.auth.user?._id}`}>
          {' '}
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>{props.auth.user?.name} </span>{' '}
        </Link>
      </li>
      <li>
        <a href='/' onClick={handleOnClick}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout </span>{' '}
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to={props.auth.isAuth ? '/dashboard' : '/'}>
          <i className='fas fa-code'></i> DevHeroes
        </Link>
      </h1>

      {!props.auth.loading && (
        <Fragment>{props.auth.isAuth ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
