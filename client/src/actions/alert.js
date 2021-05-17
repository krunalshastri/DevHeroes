import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import uuid from 'uuid';

export const setAlert = (msg, alertType) => async (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
