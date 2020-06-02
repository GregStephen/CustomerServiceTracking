import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/customer';

// GETS

//  Sends Business ID and returns a system array.
const getCustomersForBusiness = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/businessId/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const addNewCustomer = (newCustomerObj) => new Promise((resolve, reject) => {
  console.error(newCustomerObj);
  axios.post(`${baseUrl}`, newCustomerObj)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default { getCustomersForBusiness, addNewCustomer };
