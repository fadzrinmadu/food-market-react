import axios from 'axios';
import { config } from '../config';

function getToken() {
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};
  return token;
}

export async function getTags(){
  return await axios.get(`${config.api_host}/api/v1/tags`, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
}
