import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('report');

export function useGetAllReportsByBusinessId(businessId) {
  const url = `${baseUrl}/businessId/${businessId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetAllReportsByBusinessIdLastWeek(businessId) {
  const url = `${baseUrl}/businessId/${businessId}/week`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetReportsByPropertyId(propertyId) {
  const url = `${baseUrl}/propertyId/${propertyId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetReportsByUserId(userId) {
  const url = `${baseUrl}/userId/${userId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetReportById(reportId) {
  const url = `${baseUrl}/reportId/${reportId}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useAddNewReport() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((newReport) => axios.post(url, newReport), {
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
