import axios from 'axios';
import {endPoints} from '@services/api';

async function addProduct(body) {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(
    endPoints.products.addProducts,
    body,
    config
  );
  return response.data;
}

async function deleteProduct(id) {
  const response = await axios.delete(endPoints.products.deleteProduct(id));
  return response.data;
}

async function updateProduct(id, body) {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.put(
    endPoints.products.updateProduct(id),
    body,
    config
  );
  return response.data;
}
export {addProduct, deleteProduct, updateProduct};
