import axios from 'axios';

interface PropsTypes {
  genre: string;
  page: number;
  limit: number;
  orderBy: string;
  route: string;
}
/**
 * Fetch to the API with the several properties
 * API route `https://yts.mx/api/v2/list_movies.json`
 * @param {string} route - initial API URL
 * @param {string} genre - Genre of the movie user wants
 * @param {number} page - Page of the API
 * @param {number} limit - limit of the data to fetch
 * @param {string} orderBy - Sorted order of the response data `asc` or `desc`
 * @returns A Promise consisting of the data fetch from the API
 */
const useFetch = (props: PropsTypes) => {
  const {genre, page, limit, orderBy, route} = props;
  const url = `${route}?genre=${genre}&limit=${limit}&page=${page}&order_by=${orderBy}`;
  return axios.get(url);
};

export {useFetch};
