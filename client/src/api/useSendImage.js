import { useState } from 'react';
import axios from 'axios';
import { getImagesHeaders, API_ROOT } from './task.api.js';
import { useNavigate } from 'react-router-dom';

export const useSendImage = (id) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
      console.log(respuesta.data.message);
      setError(respuesta.data.message);
      respuesta.data.message != 'Only one image for task allowed'
        ? navigate(-1)
        : '';
    } catch (error) {
      console.error('error', error.response.request.statusText);
      setError(error.response.request.statusText);
    }
  };

  return { file, error, handleFileChange, sendImageForm };
};
