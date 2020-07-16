import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/user';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (err) => Promise.reject(err));


// GETS

// User log in calls this function, sends their firebase ID and returns their user object.
const getUserByFirebaseUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/uid/${uid}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});


// POSTS

// Called on user creation, returns a boolean
const addNewUser = (userobj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}`, userobj)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const addNewPersonalUser = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/personal`, userObj)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default {
  getUserByFirebaseUid,
  addNewUser,
  addNewPersonalUser,
};
