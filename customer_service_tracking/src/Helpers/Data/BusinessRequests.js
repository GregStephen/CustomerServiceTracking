import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/business';

const getBusinesses = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}`)
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

const addUnregisteredEmployee = (unregisteredEmployeeObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/unregisteredEmployee`, unregisteredEmployeeObject)
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
  getUnregisteredEmployees,
  getUnregisteredEmployeeById,
  addUnregisteredEmployee,
  checkBusinessForEmail,
  deleteUnregisteredUser,
};