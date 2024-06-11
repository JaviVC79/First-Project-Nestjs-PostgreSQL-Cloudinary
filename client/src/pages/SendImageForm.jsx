import { getImagesHeaders } from '../api/task.api.js';
import { useState } from 'react';
import axios from 'axios';

const SendImageForm = () => {
  const [nombre, setNombre] = useState('');
  const [archivo, setArchivo] = useState(null);

  const manejarCambioNombre = (e) => {
    setNombre(e.target.value);
  };

  const manejarCambioArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const httpHeaders = getImagesHeaders();
  
  const enviarFormulario = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData();
    datosFormulario.append('public_id', nombre);
    datosFormulario.append('file', archivo);
    try {
      const respuesta = await axios.post(
        'http://localhost:3000/tasks/sendImage',
        datosFormulario,
        httpHeaders,
      );
      console.log(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-white font-bold text-lg">Enviar Imagen</h2>
      <form onSubmit={enviarFormulario} encType="multipart/form-data" className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input type="text" value={nombre} onChange={manejarCambioNombre} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Archivo
          </label>
          <input type="file" onChange={manejarCambioArchivo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendImageForm;
