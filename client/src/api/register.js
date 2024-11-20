import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (task) => {
  try {
    const response = await axios.post(`https://3000-idx-tasks-project-1731612873559.cluster-y34ecccqenfhcuavp7vbnxv7zk.cloudworkstations.dev/users`, task);
    if (response?.status == 201) {
      return 201;
    }
  } catch (e) {
    console.log(e);
  }
  return 404;
};
