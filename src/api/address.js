import axios from 'axios'; 
import { config } from '../config';

export async function getAddress(params){
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.get(`${config.api_host}/api/v1/delivery-addresses`, {
    params: {
      limit: params.limit,  
      skip: params.page * params.limit - params.limit
    },
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function createAddress(payload){
	let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.post(config.api_host + '/api/v1/delivery-addresses', payload, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function getAddressById(id){
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.get(`${config.api_host}/api/v1/delivery-addresses/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function updateAddress(id, payload){
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.put(`${config.api_host}/api/v1/delivery-addresses/${id}`, payload, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function deleteAddress(id){
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.delete(`${config.api_host}/api/v1/delivery-addresses/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function setPrimaryAddress(id){
  return await updateAddress(id, { isPrimary: true });
}
