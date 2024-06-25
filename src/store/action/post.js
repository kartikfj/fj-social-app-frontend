// actions/post.js
import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, GET_POST, ADD_POST, DELETE_POST, POST_ERROR, UPDATE_LIKES, REMOVE_COMMENT, ADD_COMMENT } from './type';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// Get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a single post by ID
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like to post
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    console.log('like added');
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    });
    console.log('successful')
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like from post
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    console.log('unlike added');
    console.log(postId);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
 };

// Delete post
export const deletePost = (postId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    alert('Post Deleted!')

    dispatch({
      type: DELETE_POST,
      payload: postId // Payload should be the ID of the deleted post
    });

    dispatch(setAlert('Post Removed', 'success'));
    window.location.reload();
    return Promise.resolve();
  } catch (err) {
    const errorResponse = err.response ? err.response : { statusText: 'No response', status: 500 };
    dispatch({
      type: POST_ERROR,
      payload: { msg: errorResponse.statusText, status: errorResponse.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  console.log('Post ID:', postId);
  console.log('Form Data:', formData);

  const config = {
    headers: {
      'Content-Type': 'application/json'
      // Include Authorization header if needed
      // 'Authorization': 'Bearer YOUR_TOKEN'
    }
  };

  try {
    console.log('Sending request to the server...');
    
    // Log request details
    console.log('Request URL:', `/posts/comment/${postId}`);
    console.log('Request Config:', config);
    console.log('Request Body:', JSON.stringify(formData));

    const res = await axios.post(`api/posts/comment/${postId}`, formData, config);
    
    // Log response details
    console.log('Response from server:', res);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    console.log('Dispatch successful: ADD_COMMENT');

    dispatch(setAlert('Comment Added', 'success'));
    console.log('Alert set: Comment Added');
  } catch (err) {
    // Log detailed error information
    console.log('Error occurred:', err);
    if (err.response) {
      console.log('Error Response Data:', err.response.data);
      console.log('Error Response Status:', err.response.status);
      console.log('Error Response Headers:', err.response.headers);
    } else if (err.request) {
      console.log('Error Request:', err.request);
    } else {
      console.log('Error Message:', err.message);
    }
    console.log('Error Config:', err.config);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response ? err.response.statusText : 'No response', status: err.response ? err.response.status : 500 }
    });
  }
};

  // Delete comment
  export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
      await axios.delete(`api/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
  
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };