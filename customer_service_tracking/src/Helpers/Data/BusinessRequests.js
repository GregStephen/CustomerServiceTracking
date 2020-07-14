import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/business';

const getBusinesses = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default {
  getBusinesses,
};
