import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/job';

const getJobsNeedingAssignment = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/current-week-jobs/${businessId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default { getJobsNeedingAssignment };
