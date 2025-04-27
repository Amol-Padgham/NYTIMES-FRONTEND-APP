import axios from 'axios';

const API_KEY = 'QPX6jVmGM19eFaMyk8m4mxVYmHDWo992';
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2';

export const fetchMostPopularArticles = async (period = 1) => {
  const response = await axios.get(`${BASE_URL}/viewed/${period}.json?api-key=${API_KEY}`);
  return response.data.results;
};
