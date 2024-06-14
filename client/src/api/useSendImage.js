import { useState } from 'react';
import axios from 'axios';
import { getImagesHeaders, API_ROOT } from './task.api.js';

export const useSendImage= (id) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendImageForm = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('No file selected');
      return;
    }

    const datosFormulario = new FormData();
    datosFormulario.append('file', file);
    datosFormulario.append('id', id);

    try {
      const httpHeaders = getImagesHeaders();
      const respuesta = await axios.post(
        `${API_ROOT}/tasks/sendImage`,
        datosFormulario,
        httpHeaders,
      );
      console.log(respuesta.data);
      setError(respuesta.data.message);
    } catch (error) {
      console.error('error', error.response.request.statusText);
      setError(error.response.request.statusText);
    }
  };
  
  return { file, error, handleFileChange, sendImageForm };
};


