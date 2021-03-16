import axios from 'axios';
import { useMutation } from 'react-query';

const baseUrl = 'https://localhost:44324/api/geocoding';


export default function usePropertyGeo() {
  const url = `${baseUrl}`;
  return useMutation((property) => axios.post(url, property));
}
