import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const baseUrl = 'https://localhost:44324/api/job';

export function useJobForSystemBySystemId(systemId) {
  const url = `${baseUrl}/systemId/${systemId}`;
  return useQuery([url], () => axios.get(url));
}

export function useJobsNeedingAssignment(businessId, daysOut) {
  const url = `${baseUrl}/upcoming-jobs/${businessId}/${daysOut}`;
  return useQuery([url], () => axios.get(url));
}

export function useJobsAssignedTo(employeeId) {
  const url = `${baseUrl}/employeeId/${employeeId}`;
  return useQuery([url], () => axios.get(url));
}

export function useCreateNewJob() {
  const url = `${baseUrl}`;
  const queryClient = useQueryClient();
  return useMutation((newJob) => axios.post(url, newJob), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}/upcoming-jobs`);
        },
      });
    },
  });
}

export function useEditJob() {
  const url = `${baseUrl}/edit`;
  const queryClient = useQueryClient();
  return useMutation((job) => axios.post(url, job), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}/upcoming-jobs`);
        },
      });
    },
  });
}

export function useDeleteJob() {
  const url = `${baseUrl}/`;
  const queryClient = useQueryClient();
  return useMutation((jobId) => axios.delete(`${url}${jobId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key.startsWith(`${baseUrl}/upcoming-jobs`);
        },
      });
    },
  });
}
