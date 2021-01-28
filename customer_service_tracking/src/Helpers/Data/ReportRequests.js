import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = 'https://localhost:44324/api/report';

export function useGetAllReportsByBusinessId(businessId) {
  const url = `${baseUrl}/businessId/${businessId}`;
  return useQuery([url], () => axios.get(url));
}

export function useGetReportsByCustomerId(customerId) {
  const url = `${baseUrl}/customerId/${customerId}`;
  return useQuery([url], () => axios.get(url));
}

export function useGetReportById(reportId) {
  const url = `${baseUrl}/reportId/${reportId}`;
  return useQuery([url], () => axios.get(url));
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
