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

const deleteStory = (story) => {
  return axios.delete(`/api/stories/${story.id}`);
};

const favoriteStory = async (story) => {
  const favorite = { favorite: story.favorite };
  const response = await axios.put(`/api/stories/${story.id}`, favorite);
  console.log(response);
  return response.data;
};

export {
  fetchUsers,
  fetchAUser,
  fetchStories,
  createUser,
  deleteUser,
  createStory,
  deleteStory,
  favoriteStory,
};
