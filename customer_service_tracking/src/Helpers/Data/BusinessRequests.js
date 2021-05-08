import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = 'https://servicetrackerapi.azurewebsites.net/api/business';
// const baseUrl = 'https://localhost:44324/api/business';
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

export function useGetBusinessServiceOptions(businessId) {
  const url = `${baseUrl}/serviceOptions/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  }, { staleTime: Infinity, cacheTime: Infinity });
}
