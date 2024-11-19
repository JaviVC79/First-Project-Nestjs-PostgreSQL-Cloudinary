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
        className="w-full bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error && <h3 className="text-red-400 font-bold">{error}</h3>}
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2"
          >
            Add image
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2"
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
