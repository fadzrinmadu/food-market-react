import axios from 'axios';
import { config } from '../config';

function getToken() {
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};
  return token;
}

export async function getCategories(){
  return await axios.get(`${config.api_host}/api/v1/categories`, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
}
