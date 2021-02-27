import axios from 'axios';
import { useQuery } from 'react-query';
import constants from '../apiKeys.json';
import Formatting from '../Functions/Formatting';

const baseUrl = 'https://api.tomtom.com/search/2/search';

export default function useSearchAddresses(addressObj) {
  const query = Formatting.formatAddressIntoQuery(addressObj);
  const url = `${baseUrl}`;
  return useQuery([url, addressObj], async () => {
    const { data } = await axios.get(`${url}/${query}.json?key=${constants.tomtomKey}`);
    return data;
  });
}
