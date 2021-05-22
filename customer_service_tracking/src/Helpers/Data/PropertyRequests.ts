import axios from 'axios';
import { useQuery, useMutation, useQueryClient, Query } from 'react-query';
import useBaseUrl from './useBaseUrl';
import useHeaders from './useHeaders';

const baseUrl = useBaseUrl('customer');

function invalidatePropertyQueries(query: Query) {
  const key = query.queryKey[0] as string;
  return key.startsWith(baseUrl);
}
// GETS

export function useGetPropertyFromPropertyId(propertyId: string) {
  const url = `${baseUrl}/propertyId/${propertyId}`;
  return useQuery<Property.Property, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetPropertiesForBusiness(businessId: string) {
  const url = `${baseUrl}/businessId/${businessId}`;
  return useQuery<Array<Property.Property>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetPropertySystemFromPropertySystemId(propertySystemId: string) {
  const url = `${baseUrl}/propertySystemId/${propertySystemId}`;
  return useQuery<Property.PropertySystem, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function usePropertyChangeLog() {
  const url = `${baseUrl}/changeLog/`;
  const headers = useHeaders();
  return useQuery<Array<ChangeLog>, Error>([url], async () => {
    const { data } = await axios.get(url, {headers: headers});
    return data;
  });
}

export function useAddNewProperty() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation<Property.Property, Error, Property.Property>((property) => axios.post(url, property), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useAddNewContact() {
  const url = `${baseUrl}/contact`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.Contact, Error, Property.Contact>((contact) => axios.post(url, contact, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useUpdateProperty() {
  const url = `${baseUrl}/updateProperty`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.Property, Error, Property.Property>((updatedProperty) => axios.put(url, updatedProperty, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useUpdatePropertyName() {
  const url = `${baseUrl}/updatePropertyName`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.Property, Error, Property.Property>((updatedProperty) => axios.put(url, updatedProperty, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useUpdateContact() {
  const url = `${baseUrl}/updateContact`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.Contact, Error, Property.Contact>((newContact) => axios.put(url, newContact, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useUpdatePropertySystem() {
  const url = `${baseUrl}/updatePropertySystem`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.PropertySystem, Error, Partial<Property.PropertySystem>>((updatedPropertySystem) => axios.post(url, updatedPropertySystem, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useUpdatePropertyStatus() {
  const url = `${baseUrl}/updatePropertyStatus`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.Property, Error, Property.Property>((propertyToUpdate) => axios.put(url, propertyToUpdate, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useDeleteProperty() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>((propertyToDeleteId) => axios.delete(`${url}/${propertyToDeleteId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useDeleteContact() {
  const url = `${baseUrl}/contact`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<any, Error, string>((contactToDeleteId) => axios.delete(`${url}/${contactToDeleteId}`, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useDeletePropertySystem() {
  const url = `${baseUrl}/propertySystem`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<any, Error, string>((propertySystemId) => axios.delete(`${url}/${propertySystemId}`, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}

export function useAddNewPropertySystem() {
  const url = `${baseUrl}/addSystem`;
  const queryClient = useQueryClient();
  const headers = useHeaders();
  return useMutation<Property.PropertySystem, Error, { system: Partial<Property.PropertySystem>; report: Partial<Property.Report>}>((propertySystem) => axios.post(url, propertySystem, {headers: headers}), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidatePropertyQueries
      });
    },
  });
}
