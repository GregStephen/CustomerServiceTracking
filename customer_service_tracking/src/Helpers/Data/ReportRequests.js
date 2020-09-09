import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/report';

const getReportsByCustomerId = (customerId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customerId/${customerId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const addNewReport = (newReport) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}`, newReport)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});


export default { getReportsByCustomerId, addNewReport };
