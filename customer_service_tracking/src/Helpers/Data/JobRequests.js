import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/job';

const getJobForSystemBySystemId = (systemId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/systemId/${systemId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
})
const getJobsNeedingAssignment = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/current-week-jobs/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default { getJobForSystemBySystemId, getJobsNeedingAssignment };
