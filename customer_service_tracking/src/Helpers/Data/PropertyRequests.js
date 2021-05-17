import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useBaseUrl from './useBaseUrl';
import useHeaders from './useHeaders';

const baseUrl = useBaseUrl('customer');
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

export function usePropertyChangeLog() {
  const url = `${baseUrl}/changeLog/`;
  const headers = useHeaders();
  return useQuery([url], async () => {
    const { data } = await axios.get(url, {headers: headers});
    return data;
  });
}

export function useAddNewProperty() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((property) => axios.post(url, property), {
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

export function useAddNewContact() {
  const url = `${baseUrl}/contact`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation((contact) => axios.post(url, contact, {headers: headers}), {
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
  const headers = useHeaders();
  return useMutation((updatedProperty) => axios.put(url, updatedProperty, {headers: headers}), {
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

export function useUpdatePropertyName() {
  const url = `${baseUrl}/updatePropertyName`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation((updatedProperty) => axios.put(url, updatedProperty, {headers: headers}), {
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
  const headers = useHeaders();
  return useMutation((newContact) => axios.put(url, newContact, {headers: headers}), {
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
  const headers = useHeaders();
  return useMutation((updatedPropertySystem) => axios.post(url, updatedPropertySystem, {headers: headers}), {
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
  const headers = useHeaders();
  return useMutation((propertyToUpdate) => axios.put(url, propertyToUpdate, {headers: headers}), {
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

export function useDeleteContact() {
  const url = `${baseUrl}/contact`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation((contactToDeleteId) => axios.delete(`${url}/${contactToDeleteId}`, {headers: headers}), {
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
  const headers = useHeaders();
  return useMutation((propertySystemId) => axios.delete(`${url}/${propertySystemId}`, {headers: headers}), {
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
  const headers = useHeaders();
  return useMutation((propertySystem) => axios.post(url, propertySystem, {headers: headers}), {
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
