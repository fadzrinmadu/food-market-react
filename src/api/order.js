import axios from 'axios';
import { config } from '../config';

export async function getOrders(params){
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  let { limit, page, startDate, endDate } = params;
  let skip = (page * limit) - limit;

  return await axios.get(`${config.api_host}/api/v1/orders`, {
    params: {
      skip,
      limit,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    },
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function createOrder(payload){
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.post(`${config.api_host}/api/v1/orders`, payload, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}
