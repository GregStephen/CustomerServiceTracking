import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = 'https://localhost:44324/api/JobType';

export default function useGetJobTypes() {
  const url = `${baseUrl}`;
  return useQuery([url], () => axios.get(url));
}
