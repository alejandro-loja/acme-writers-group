const axios = require("axios");

const fetchUsers = () => {
  return axios.get("/api/users");
};

const fetchAUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
};

const createUser = async () => {
  const response = await axios.post("/api/users");
  return response.data;
};

const fetchStories = (userId) => {
  return axios.get(`/api/users/${userId}/stories`);
};

const deleteUser = (user) => {
  return axios.delete(`/api/users/${user.id}`);
};

const createStory = async (userId) => {
  console.log(userId);
  const response = await axios.post(`/api/users/${userId}/stories`);
  return response.data;
};

const deleteStory = (id) => {
  return axios.delete(`/api/stories/${id}`);
};

export {
  fetchUsers,
  fetchAUser,
  fetchStories,
  createUser,
  deleteUser,
  createStory,
  deleteStory,
};
