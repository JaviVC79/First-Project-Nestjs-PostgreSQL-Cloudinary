import { Form, Formik } from 'formik';
//import { UseAuth } from '../context/AuthContext';
import { sendTaskImage } from '../api/task.api.js';

function SendImageForm() {
 // const { signup } = UseAuth();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-white font-bold text-lg">Send your image</h2>
      <Formik
        initialValues={{
          URL: '',
          public_id: '',
        }}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          try {
            sendTaskImage(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image URL
              </label>
              <input
                type="URL"
                name="URL"
                placeholder="Write your image URL"
                onChange={handleChange}
                value={values.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Name
              </label>
              <input
                type="text"
                name="public_id"
                placeholder="Name your image"
                onChange={handleChange}
                value={values.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Try to login...' : 'Login'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SendImageForm;