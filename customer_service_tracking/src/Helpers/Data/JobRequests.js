import axios from 'axios';

const baseUrl = 'https://localhost:44324/api/job';

const getJobForSystemBySystemId = (systemId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/systemId/${systemId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getJobsNeedingAssignment = (businessId, daysOut) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/upcoming-jobs/${businessId}/${daysOut}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const getJobsAssignedTo = (employeeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/employeeId/${employeeId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const createNewJob = (newJob) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}`, newJob)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const editJob = (job) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/edit`, job)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

const deleteJob = (jobId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/${jobId}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export default {
  getJobForSystemBySystemId, getJobsNeedingAssignment, getJobsAssignedTo, createNewJob, editJob, deleteJob,
};
