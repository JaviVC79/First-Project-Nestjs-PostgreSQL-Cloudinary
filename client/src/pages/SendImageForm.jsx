import { useSendImage } from '../hooks/useSendImage.js';
import { deleteTaskImage } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';

const SendImageForm = ({task}) => {
  const { email } = UseAuth();
  const { error, handleFileChange, sendImageForm } = useSendImage(task.id, email);

  return (
    <form
      onSubmit={sendImageForm}
      encType="multipart/form-data"
      className="w-full bg-gray-900 rounded-lg shadow-md p-4"
    >
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Select an image
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="shadow-sm appearance-none border-2 border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
        />
        {error && <h3 className="text-red-500 text-sm font-bold mt-2">{error}</h3>}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <button
          type="submit"
          className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Add image
        </button>
        <button
          type="button"
          className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          onClick={async () => {
            await deleteTaskImage(task.id);
            window.location.reload();
          }}
        >
          Delete image
        </button>
      </div>
    </form>
  );
};

export default SendImageForm;

