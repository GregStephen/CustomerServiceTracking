import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = 'https://servicetrackerapi.azurewebsites.net/api/JobType';
// const baseUrl = 'https://localhost:44324/api/JobType';

export default function useGetJobTypes() {
  const url = `${baseUrl}`;
  return useQuery([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}
