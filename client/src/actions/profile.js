import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/dev/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data,
        status: err.response.status,
      },
    });
  }
};

//Edit or Create Profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const res = await axios.post(
        'http://localhost:5000/dev/profile',
        formData,
        config
      );

      console.log(formData);
      console.log(edit);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated!' : 'Profile Created!', 'success')
      );

      if (!edit) history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, 'danger'));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.data,
          status: err.response.status,
        },
      });
    }
  };

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put(
      'http://localhost:5000/dev/profile/experience',
      formData,
      config
    );

    console.log(formData, res);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added!', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data,
        status: err.response.status,
      },
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put(
      'http://localhost:5000/dev/profile/education',
      formData,
      config
    );

    console.log(formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added!', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors.length > 0) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data,
        status: err.response.status,
      },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    axios.delete(`/dev/profile/experience/${id}`).then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    );
    dispatch(setAlert('Experience Removed!', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data,
        status: err.response.status,
      },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    axios.delete(`/dev/profile/education/${id}`).then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    );
    dispatch(setAlert('Education Removed!', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data,
        status: err.response.status,
      },
    });
  }
};

//Delete profile & account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure want to DELETE your account?')) {
    try {
      axios.delete(`/dev/profile`).then(
        (res) =>
          dispatch({
            type: CLEAR_PROFILE,
          }),
        dispatch({
          type: DELETE_ACCOUNT,
        })
      );
      dispatch(setAlert('Education Removed!', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.data,
          status: err.response.status,
        },
      });
    }
  }
};
