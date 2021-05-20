import axios from 'axios';
import { useQuery, useMutation, useQueryClient, Query} from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('report');

function invalidateReportQueries(query: Query) {
  const key = query.queryKey[0] as string;
  return key.startsWith(baseUrl);
}
export function useGetAllReportsByBusinessId(businessId: string) {
  const url = `${baseUrl}/businessId/${businessId}`;
  return useQuery<Array<Property.Report>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetAllReportsByBusinessIdLastWeek(businessId: string) {
  const url = `${baseUrl}/businessId/${businessId}/week`;
  return useQuery<Array<Property.Report>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetReportsByPropertyId(propertyId: string) {
  const url = `${baseUrl}/propertyId/${propertyId}`;
  return useQuery<Array<Property.Report>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetReportsByUserId(userId: string) {
  const url = `${baseUrl}/userId/${userId}`;
  return useQuery<Array<Property.Report>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useGetReportById(reportId: string) {
  const url = `${baseUrl}/reportId/${reportId}`;
  return useQuery<Property.Report, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useAddNewReport() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<Property.Report>>((newReport) => axios.post(url, newReport), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateReportQueries
      });
    },
  });
}
