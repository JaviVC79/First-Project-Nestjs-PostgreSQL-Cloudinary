import { useParams } from 'react-router-dom';
import { useSendImage } from '../api/useSendImage.js';

const SendImageForm = () => {
  const { id } = useParams();
  const { error, handleFileChange, sendImageForm } = useSendImage(id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-white font-bold text-lg">Send Image</h2>
      <form
        onSubmit={sendImageForm}
        encType="multipart/form-data"
        className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            File Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error && <h3 className="text-red-400 font-bold">{error}</h3>}
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
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {}}
          >
            Delete Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendImageForm;