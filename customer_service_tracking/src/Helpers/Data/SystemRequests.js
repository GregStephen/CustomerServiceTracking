import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/system';

// GETS

//  Sends Business ID and returns a system array.
const getSystemsForBusiness = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});


// POSTS

// Sends a new System with users Business Id attached.
const addNewSystem = (systemObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}`, systemObj)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});


// DELETES

const deleteSystemById = (systemId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/${systemId}`)
    .then((results) => resolve(results))
    .catch((err) => reject(err));
});

export default {
  getSystemsForBusiness,
  addNewSystem,
  deleteSystemById,
};
