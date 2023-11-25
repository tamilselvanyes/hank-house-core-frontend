import { Product } from '../pages/Products/Model';
import { characters } from './constant';
import axios from 'axios';

export const generate_random_string = (length: number): string => {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return result;
};

const baseUrl = 'http://localhost:8000/';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${baseUrl}auth/signin`, {
    username: email,
    password: password,
  });
  return response;
};

export const registerUser = async (
  email: string,
  password: string,
  username: string,
  role: string
) => {
  const response = await axios.post(`${baseUrl}auth/signup`, {
    username,
    email,
    roles: [role],
    password,
  });
  return response;
};

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}product/`);
  return response.data;
};

export const getProductbyId = async (id: string) => {
  const response: any = await axios.get(`${baseUrl}product/${id}`);
  return response.data;
};

export const getWishlist = async (user_id: string) => {
  const response = await axios.get(
    `${baseUrl}wishlist/?userId=${user_id}`
  );
  return response;
};

export const createWishlist = async (
  user_id: string,
  productId: string
) => {
  const resp = await axios.post(`${baseUrl}wishlist/`, {
    userId: user_id,
    productId: productId,
  });
  return resp;
};

export const removeFromWishlist = async (itemId: string) => {
  const resp = await axios.delete(`${baseUrl}wishlist/${itemId}`);
  return resp;
};
