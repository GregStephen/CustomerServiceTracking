import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = 'https://localhost:44324/api/business';

const getBusinesses = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}`)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});

export function useGetBusinesses() {
  const url = `${baseUrl}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetRegisteredAndUnregisteredEmployees(businessId) {
  const url = `${baseUrl}/allEmployees/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetRegisteredEmployees(businessId) {
  const url = `${baseUrl}/registeredEmployees/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}


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
  getUnregisteredEmployees,
  getUnregisteredEmployeeById,
  checkBusinessForEmail,
  deleteUnregisteredUser,
};
