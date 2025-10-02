const apiUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_URL;

const CONSTANTS_COMMON = {
  API_BASE_URL: apiUrl,
};

export default CONSTANTS_COMMON