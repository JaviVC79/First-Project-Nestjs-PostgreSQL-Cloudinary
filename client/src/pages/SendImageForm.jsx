import { getImagesHeaders } from '../api/task.api.js';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SendImageForm = () => {
  let { id } = useParams();
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const manejarCambioArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };
  const httpHeaders = getImagesHeaders();

  const enviarFormulario = async (e) => {
    e.preventDefault();
    if (archivo != null) {
      const datosFormulario = new FormData();
      //datosFormulario.append('public_id', nombre);
      datosFormulario.append('file', archivo);
      datosFormulario.append('id', id);
      try {
        const respuesta = await axios.post(
          'http://localhost:3000/tasks/sendImage',
          datosFormulario,
          httpHeaders,
        );
        console.log(respuesta.data);
        setError(respuesta.data.message);
      } catch (error) {
        console.error('error', error.response.request.statusText);
        setError(error.response.request.statusText);
      }
    } else {
      setError('No file selected');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-white font-bold text-lg">Send Image</h2>
      <form
        onSubmit={enviarFormulario}
        encType="multipart/form-data"
        className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            File Image
          </label>
          <input
            type="file"
            onChange={manejarCambioArchivo}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error == 'Payload Too Large' ? (
            <h3 className="text-red-400 font-bold">
              {'File is too large(1.5 MB maximum allowed)'}
            </h3>
          ) : error == 'No file selected' ? (
            <h3 className="text-red-400 font-bold">{'No file selected'}</h3>
          ) : error == 'Only one image for task allowed' ? (
            <h3 className="text-red-400 font-bold">
              {'Only one image for task allowed'}
            </h3>
          ) : (
            <h3></h3>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Image
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{  }}
          >
            Delete Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendImageForm;
