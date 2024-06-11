import axios from 'axios';

export const jwt = getCookie('jwt');

export const userEmail = decodeCookieJWT(jwt);

/*const httpHeaders = {
  withCredentials: true,
  xsrfCookieName: 'jwt',
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
};*/

function decodeCookieJWT(token) {
  if (token != undefined) {
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
  } else {
    return '';
  }
}

export function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    const decodedValue = decodeURIComponent(parts.pop().split(';').shift());
    const jwt = decodedValue.slice(17, decodedValue.length - 2);
    return jwt;
  }
}

export const logOut = (userEmail) => {
  window.document.cookie =
    'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  userEmail = '';
  return userEmail;
};

const getHeaders = () => {
  const jwt = getCookie('jwt');
  const httpHeaders = {
    withCredentials: true,
    xsrfCookieName: 'jwt',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  return httpHeaders;
};

export const getImagesHeaders = () => {
  const jwt = getCookie('jwt');
  const httpHeaders = {
    withCredentials: true,
    xsrfCookieName: 'jwt',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return httpHeaders;
};

export const createTaskRequest = async (task) => {
  const email = userEmail;
  const body = { ...task, email };

  const httpHeaders = getHeaders();
  await axios.post('http://localhost:3000/tasks/createTask', body, httpHeaders);
};

export const getAllTasks = async (email) => {
  const httpHeaders = getHeaders();
  const response = await axios.get(
    `http://localhost:3000/tasks/getTasks?userEmail=${email}`,
    httpHeaders,
  );
  const data = response.data;
  return data;
};

export const getOneTask = async () => {
  const httpHeaders = getHeaders();
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const response = await axios.get(
    `http://localhost:3000/tasks/getTask?userEmail=${userEmail}&name=${name}`,
    httpHeaders,
  );
  const data = response.data;
  return data;
};

export const deleteTask = async (email, taskName) => {
  const httpHeaders = getHeaders();
  await axios.delete(
    `http://localhost:3000/tasks/${taskName}/${email}`,
    httpHeaders,
  );
};

export const updateTaskRequest = async (task, id) => {
  const body = { ...task, userEmail, id };
  const httpHeaders = getHeaders();
  await axios.put('http://localhost:3000/tasks/updateTask', body, httpHeaders);
};

/*export const sendTaskImage = async (image) => {
  const email = userEmail;

  const body = { ...image };

  const httpHeaders = getHeaders();
  await axios.post('http://localhost:3000/tasks/sendImage', body, httpHeaders);
};*/

export const sendTaskImage = async (image) => {
  const email = userEmail;

  if (typeof image.public_id === 'string' && typeof email === 'string') {
    image.public_id = email + image.public_id;
  }

  const body = { ...image };

  const httpHeaders = getHeaders();
  await axios.post('http://localhost:3000/tasks/sendImage', body, httpHeaders);
};
