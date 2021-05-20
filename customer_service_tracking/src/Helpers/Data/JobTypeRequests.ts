import axios from 'axios';
import { useQuery } from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('JobType');

export default function useGetJobTypes() {
  const url = `${baseUrl}`;
  return useQuery<Business.JobType[], Error>([url], async () => {
    const { data } = await axios.get(url);
    return data;
  });
}
