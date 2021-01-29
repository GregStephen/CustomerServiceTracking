import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = 'https://localhost:44324/api/customer';

// GETS

//  Sends Business ID and returns a system array.
export function useGetCustomerFromCustomerId(customerId) {
  const url = `${baseUrl}/customerId/${customerId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetCustomerForBusiness(businessId) {
  const url = `${baseUrl}/businessId/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetCustomerSystemFromCustomerSystemId(customerSystemId) {
  const url = `${baseUrl}/customerSystemId/${customerSystemId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useAddNewCustomer() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((customer) => axios.post(url, customer), {
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


export function useUpdateCustomerSystem() {
  const url = `${baseUrl}/updateCustomerSystem`;
  const queryClient = useQueryClient();
  return useMutation((updatedCustomerSystem) => axios.post(url, updatedCustomerSystem), {
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

export function useAddNewCustomerSystem() {
  const url = `${baseUrl}/addSystem`;
  const queryClient = useQueryClient();
  return useMutation((customerSystem) => axios.post(url, customerSystem), {
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
