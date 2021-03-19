import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = 'https://localhost:44324/api/user';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (err) => Promise.reject(err));


// GETS

// User log in calls this function, sends their firebase ID and returns their user object.
export function useUserByFirebaseUid(uid, authenticated) {
  const url = `${baseUrl}/${uid}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  }, { enabled: authenticated && !!uid });
}


export function useUserById(id) {
  const url = `${baseUrl}/user/${id}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  }, { enabled: !!id });
}
// POSTS

// Called on user creation, returns a boolean
const addNewUser = (userobj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}`, userobj)
    .then((results) => resolve(results.data))
    .catch((err) => reject(err));
});


export default {
  addNewUser,
};
