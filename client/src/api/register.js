import axios from 'axios';

export const register = async (task) => {
  try {
    const response = await axios.post('http://localhost:3000/users', task);
    if (response?.status == 201) {
      return 201;
    }
  } catch (e) {
    console.log(e);
  }
  return 404;
};
