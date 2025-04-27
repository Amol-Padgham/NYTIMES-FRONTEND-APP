import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2';

export const fetchMostPopularArticles = async (period = 1) => {
  const response = await axios.get(`${BASE_URL}/viewed/${period}.json?api-key=${API_KEY}`);
  return response.data.results;
};
