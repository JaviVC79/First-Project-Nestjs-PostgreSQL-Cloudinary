import axios from 'axios';
import { API_ROOT, getHeaders } from './task.api.js';

export const strapiPayments = async (id) => {
  try {
    const body = { id, amount: '100' };
    const httpHeaders = getHeaders();
    const response = await axios.post(
      `${API_ROOT}/stripe/payments`,
      body,
      httpHeaders,
    );
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};
