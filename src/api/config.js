export const API_BASE_URL = 'https://69e9b52455d62f34797ad0b7.mockapi.io/mock/:endpoint';

export const getEndpoint = (endpoint) => {
  return API_BASE_URL.replace(':endpoint', endpoint);
};

export default {
  API_BASE_URL,
  getEndpoint
};
