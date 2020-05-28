import axios from 'axios';

// POST
export const PostUser = obj =>
  axios.post(`/Usuario`, obj).then(response => response.data);

// UPDATE
export const UpdateUser = obj =>
  axios.put(`/Usuario`, obj).then(response => response.data);
