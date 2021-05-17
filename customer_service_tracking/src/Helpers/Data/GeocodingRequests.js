import axios from 'axios';
import { useMutation } from 'react-query';
import useBaseUrl from './useBaseUrl';

const baseUrl = useBaseUrl('geocoding');

export default function usePropertyGeo() {
  const url = `${baseUrl}`;
  return useMutation((property) => axios.post(url, property));
}
