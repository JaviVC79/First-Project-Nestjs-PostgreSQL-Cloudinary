import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (task) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users`, task);
    if (response?.status == 201) {
      return 201;
    }
  } catch (e) {
    console.log(e);
  }
  return 404;
};
