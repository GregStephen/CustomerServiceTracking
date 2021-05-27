import axios from 'axios';
import { useQuery, useMutation, useQueryClient, Query } from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('user');

function invalidateSystemQueries(query: Query) {
  const key = query.queryKey[0] as string;
  return key.startsWith(baseUrl);
}
axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (err) => Promise.reject(err));

// GETS

// User log in calls this function, sends their firebase ID and returns their user object.
export function useUserByFirebaseUid(uid: string, authenticated: boolean) {
  const url = `${baseUrl}/${uid}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  }, { enabled: authenticated && !!uid });
}


export function useUserById(id: string) {
  const url = `${baseUrl}/user/${id}`;
  return useQuery<Business.User, Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  }, { enabled: !!id });
}
// POSTS

// Called on user creation, returns a boolean
// const addNewUser = (userobj) => new Promise((resolve, reject) => {
//   axios.post(`${baseUrl}`, userobj)
//     .then((results) => resolve(results.data))
//     .catch((err) => reject(err));
// });

export function useUpdateUserAdmin() {
  const url = `${baseUrl}/updateAdmin`;
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<Business.User>>((userToUpdate) => axios.post(url, userToUpdate), {
    onSuccess: (data, userToUpdate) => {
      queryClient.invalidateQueries({
        predicate: invalidateSystemQueries
      });
    },
  });
}

