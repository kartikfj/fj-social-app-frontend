import axios from 'axios';
import { PROFILE_ERROR,GET_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from './type';
import { setAlert } from './alert';
// import Cookies from 'js-cookie';

// Register User

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me'); // Changed to axios.get

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    if (!edit) {
      navigate('/dashboard'); // Using navigate function
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Add experience
export const addExperience = (formData, navigate) => async dispatch => {
  
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience added', 'success'));

    navigate('/dashboard'); // Using navigate function
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add education
export const addEducation = (formData, navigate) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education added', 'success'));

    navigate('/dashboard'); // Using navigate function
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete experience
export const deleteExperience = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${expId}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data // Assuming API returns updated profile data after deletion
    });

    dispatch(setAlert('Experience deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete education
export const deleteEducation = (eduId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${eduId}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data // Assuming API returns updated profile data after deletion
    });

    dispatch(setAlert('Education deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({
        type: UPDATE_PROFILE,
        payload: null // Assuming API returns null after deletion or clears the profile
      });

      dispatch(setAlert('Your account has been permanently deleted', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
export const getAllProfile = () => async dispatch => {
  
  try {
    const res = await axios.get('http://two.campusplacehub.com/api/profile'); // Changed to axios.get

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//get profile by id
export const getProfileById = (userId) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`); // Changed to axios.get

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getGithubRepos = (username) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/profile/github/${username}`); // Changed to axios.get

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};