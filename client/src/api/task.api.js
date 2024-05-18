import axios from 'axios';

const jwt = getCookie('jwt');

const userEmail = decodeCookieJWT(jwt);

const httpHeaders = {
  withCredentials: true,
  xsrfCookieName: 'jwt',
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
};

function decodeCookieJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload).sub;
}

function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    const decodedValue = decodeURIComponent(parts.pop().split(';').shift());
    const jwt = decodedValue.slice(17, decodedValue.length - 2);
    return jwt;
  }
}

export const createTaskRequest = async (task) => {
  const body = { ...task, userEmail };
  await axios.post('http://localhost:3000/tasks/createTask', body, httpHeaders);
};

export const getAllTasks = async () => {
  const response = await axios.get(
    `http://localhost:3000/tasks/getTasks?userEmail=${userEmail}`,
    httpHeaders,
  );
  const data = response.data;
  return data;
};


