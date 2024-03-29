import axios from 'axios';
import { useQuery, useMutation, useQueryClient, Query } from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('job');

function invalidateReportQueries(query: Query) {
  const key = query.queryKey[0] as string;
  return key.startsWith(baseUrl);
}
export function useJobForSystemBySystemId(systemId: string) {
  const url = `${baseUrl}/systemId/${systemId}`;
  return useQuery<Business.Job, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useJobs(businessId: string) {
  const url = `${baseUrl}/${businessId}`;
  return useQuery<Array<Business.Job>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useJobsNeedingAssignment(businessId: string, daysOut: number) {
  const url = `${baseUrl}/upcoming-jobs/${businessId}/${daysOut}`;
  return useQuery<Array<Business.ServiceNeed>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useJobsAssignedTo(employeeId: string) {
  const url = `${baseUrl}/employeeId/${employeeId}`;
  return useQuery<Array<Business.Job>, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export function useCreateNewJob() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation<Partial<Business.Job>, Error, Partial<Business.Job>>((newJob) => axios.post(url, newJob), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateReportQueries
      });
    },
  });
}

export function useEditJob() {
  const url = `${baseUrl}/edit`;
  const queryClient = useQueryClient();
  return useMutation<Business.Job, Error, Business.Job>((job) => axios.post(url, job), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateReportQueries
      });
    },
  });
}

export function useDeleteJob() {
  const url = `${baseUrl}/`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>((jobId) => axios.delete(`${url}${jobId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: invalidateReportQueries
      });
    },
  });
}
