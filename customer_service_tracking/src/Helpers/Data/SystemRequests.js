import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = 'https://servicetrackerapi.azurewebsites.net/api/system';
// const baseUrl = 'https://localhost:44324/api/system';

// GETS

//  Sends Business ID and returns a system array.
export function useGetSystemsForBusiness(businessId) {
  const url = `${baseUrl}/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

// POSTS

// Sends a new System with users Business Id attached.
export function useAddNewSystem() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((newSystem) => axios.post(url, newSystem), {
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

// DELETES
export function useDeleteSystemById() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((systemId) => axios.delete(`${url}/${systemId}`), {
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

// PUTS

export function useEditSystem() {
  const url = `${baseUrl}/updateSystem`;
  const queryClient = useQueryClient();
  return useMutation((updatedSystem) => axios.put([url], updatedSystem), {
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
