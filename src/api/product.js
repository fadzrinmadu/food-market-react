import axios from 'axios';
import { config } from '../config';

function getToken() {
  let { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')) : {};
  return token;
}

function toFormData(payload) {
  let formData = new FormData();

  Object.keys(payload).forEach(key => {
    let value = payload[key];
    if (value === undefined || value === null) return;

    if (key === 'tags' && Array.isArray(value)) {
      value.forEach(tag => formData.append('tags[]', tag));
      return;
    }

    formData.append(key, value);
  });

  return formData;
}

export async function getProducts(params){
  return await axios.get(`${config.api_host}/api/v1/products`, {
    params
  });
}

export async function getProductById(id){
  return await axios.get(`${config.api_host}/api/v1/products/${id}`, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
}

export async function createProduct(payload){
  return await axios.post(`${config.api_host}/api/v1/products`, toFormData(payload), {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
}

export async function updateProduct(id, payload){
  return await axios.put(`${config.api_host}/api/v1/products/${id}`, toFormData(payload), {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
}

export async function deleteProduct(id){
  return await axios.delete(`${config.api_host}/api/v1/products/${id}`, {
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  });
}
