import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = 'https://localhost:44324/api/customer';

// GETS

export function useGetPropertyFromPropertyId(propertyId) {
  const url = `${baseUrl}/propertyId/${propertyId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetPropertiesForBusiness(businessId) {
  const url = `${baseUrl}/businessId/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetPropertySystemFromPropertySystemId(propertySystemId) {
  const url = `${baseUrl}/propertySystemId/${propertySystemId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useAddNewProperty() {
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

export function useUpdateProperty() {
  const url = `${baseUrl}/updateProperty`;
  const queryClient = useQueryClient();
  return useMutation((updatedProperty) => axios.put(url, updatedProperty), {
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

export function useUpdateContact() {
  const url = `${baseUrl}/updateContact`;
  const queryClient = useQueryClient();
  return useMutation((newContact) => axios.put(url, newContact), {
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


export function useUpdatePropertySystem() {
  const url = `${baseUrl}/updatePropertySystem`;
  const queryClient = useQueryClient();
  return useMutation((updatedPropertySystem) => axios.post(url, updatedPropertySystem), {
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

export function useUpdatePropertyStatus() {
  const url = `${baseUrl}/updatePropertyStatus`;
  const queryClient = useQueryClient();
  return useMutation((propertyToUpdate) => axios.put(url, propertyToUpdate), {
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

export function useDeleteProperty() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((propertyToDeleteId) => axios.delete(`${url}/${propertyToDeleteId}`), {
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

export function useDeletePropertySystem() {
  const url = `${baseUrl}/propertySystem`;
  const queryClient = useQueryClient();
  return useMutation((propertySystemId) => axios.delete(`${url}/${propertySystemId}`), {
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

export function useAddNewPropertySystem() {
  const url = `${baseUrl}/addSystem`;
  const queryClient = useQueryClient();
  return useMutation((propertySystem) => axios.post(url, propertySystem), {
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