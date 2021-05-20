import axios from 'axios';
import { useQuery, useMutation, useQueryClient, Query } from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('system');

function invalidateSystemQueries(query: Query) {
  const key = query.queryKey[0] as string;
  return key.startsWith(baseUrl);
}
// GETS

//  Sends Business ID and returns a system array.
export function useGetSystemsForBusiness(businessId: string) {
  const url = `${baseUrl}/${businessId}`;
  return useQuery<Array<Business.BusinessSystem>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

// POSTS

// Sends a new System with users Business Id attached.
export function useAddNewSystem() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, Business.BusinessSystem>((newSystem) => axios.post(url, newSystem), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateSystemQueries
      });
    },
  });
}

// DELETES
export function useDeleteSystemById() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>((systemId) => axios.delete(`${url}/${systemId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateSystemQueries
      });
    },
  });
}

// PUTS

export function useEditSystem() {
  const url = `${baseUrl}/updateSystem`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, Business.BusinessSystem>((updatedSystem) => axios.put(url, updatedSystem), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateSystemQueries
      });
    },
  });
}
