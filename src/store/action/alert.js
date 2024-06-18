// Assuming you've defined your action types
import { v4 as uuidv4 } from 'uuid';
export const SET_ALERT='SET_ALERT';
export const REMOVE_ALERT='REMOVE_ALERT';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  try {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, alertType, id } });

    setTimeout(() => {
      try {
        dispatch({ type: REMOVE_ALERT, payload: id });
      } catch (error) {
        console.error("Error in removing alert:", error);
      }
    }, timeout);
  } catch (error) {
    console.error("Error creating/removing alert:", error);
  }
};
