import axios from 'axios';

const useFetch = ({ url, body }) => {
  return body ? axios.post(url, body) : axios.get(url);
};

export default useFetch;
