import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/customer';

// GETS

//  Sends Business ID and returns a system array.
const getCustomersForBusiness = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/businessId/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getCustomerFromCustomerId = (customerId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customerId/${customerId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getCustomerSystemFromCustomerSystemId = (customerSystemId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customerSystemId/${customerSystemId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const addNewCustomer = (newCustomerObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}`, newCustomerObj)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const updateCustomer = (updatedCustomer) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/updateCustomer`, updatedCustomer)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const updateCustomerAddress = (updatedCustomerAddress) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/updateCustomerAddress`, updatedCustomerAddress)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const updateCustomerSystem = (updatedCustomerSystem) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/updateCustomerSystem`, updatedCustomerSystem)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const updateCustomerStatus = (updatedCustomer) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/updateCustomerStatus`, updatedCustomer)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const deleteCustomer = (customerToDeleteId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/${customerToDeleteId}`)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const deleteThisCustomerSystem = (customerSystemId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/customerSystem/${customerSystemId}`)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const addNewCustomerSystem = (customerSystem) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/addSystem`, customerSystem)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

export default {
  getCustomersForBusiness,
  getCustomerFromCustomerId,
  getCustomerSystemFromCustomerSystemId,
  addNewCustomer,
  updateCustomer,
  updateCustomerAddress,
  updateCustomerStatus,
  updateCustomerSystem,
  deleteCustomer,
  deleteThisCustomerSystem,
  addNewCustomerSystem,
};
