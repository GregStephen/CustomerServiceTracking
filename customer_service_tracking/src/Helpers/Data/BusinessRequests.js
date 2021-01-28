import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/business';

const getBusinesses = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getRegisteredAndUnregisteredEmployees = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/allEmployees/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getRegisteredEmployees = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/registeredEmployees/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getUnregisteredEmployees = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/unregisteredEmployees/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getUnregisteredEmployeeById = (unregisteredEmployeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/unregisteredEmployee/${unregisteredEmployeeId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const checkBusinessForEmail = (possibleMatch) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/unregisteredEmployee/email=${possibleMatch.email}/businessId=${possibleMatch.chosenBusiness}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const deleteUnregisteredUser = (unregisteredUserId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/unregisteredEmployee/${unregisteredUserId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default {
  getBusinesses,
  getRegisteredAndUnregisteredEmployees,
  getRegisteredEmployees,
  getUnregisteredEmployees,
  getUnregisteredEmployeeById,
  checkBusinessForEmail,
  deleteUnregisteredUser,
};
