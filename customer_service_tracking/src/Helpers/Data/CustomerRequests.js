import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = 'https://localhost:44324/api/customer';

// GETS

//  Sends Business ID and returns a system array.
export function useGetCustomerFromCustomerId(customerId) {
  const url = `${baseUrl}/customerId/${customerId}`;
  return useQuery([url], () => axios.get(url));
}

const getCustomersForBusiness = (businessId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/businessId/${businessId}`)
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

export function useUpdateCustomer() {
  const url = `${baseUrl}/updateCustomer`;
  const queryClient = useQueryClient();
  return useMutation((updatedCustomer) => axios.put(url, updatedCustomer), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}`);
        },
      });
    },
  });
}

export function useUpdateCustomerAddress() {
  const url = `${baseUrl}/updateCustomerAddress`;
  const queryClient = useQueryClient();
  return useMutation((newAddress) => axios.put(url, newAddress), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}`);
        },
      });
    },
  });
}
const updateCustomerSystem = (updatedCustomerSystem) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/updateCustomerSystem`, updatedCustomerSystem)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

export function useUpdateCustomerStatus() {
  const url = `${baseUrl}/updateCustomerStatus`;
  const queryClient = useQueryClient();
  return useMutation((customerToUpdate) => axios.put(url, customerToUpdate), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}`);
        },
      });
    },
  });
}

export function useDeleteCustomer() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((customerToDeleteId) => axios.delete(`${url}/${customerToDeleteId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}`);
        },
      });
    },
  });
}

export function useDeleteCustomerSystem() {
  const url = `${baseUrl}/customerSystem`;
  const queryClient = useQueryClient();
  return useMutation((customerSystemId) => axios.delete(`${url}/${customerSystemId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}`);
        },
      });
    },
  });
}

const addNewCustomerSystem = (customerSystem) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/addSystem`, customerSystem)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

export default {
  getCustomersForBusiness,
  getCustomerSystemFromCustomerSystemId,
  addNewCustomer,
  updateCustomerSystem,
  addNewCustomerSystem,
};
