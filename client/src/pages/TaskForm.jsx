import { Form, Formik } from 'formik';
import { createTaskRequest } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const navigate = useNavigate();
  const { email } = UseAuth();
  const TaskStatus = ['PENDING', 'IN_PROCESS', 'DONE'];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-white font-bold text-lg">Add new task</h2>
      <Formik
        initialValues={{
          name: '',
          userEmail: email,
          taskDescription: '',
          taskStatus: TaskStatus[0],
        }}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          try {
            await createTaskRequest(values);
            navigate('/tasks');
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
                Task name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Write a name for your task"
                onChange={handleChange}
                value={values.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Task description
              </label>
              <textarea
                name="taskDescription"
                rows="3"
                placeholder="Write your description"
                onChange={handleChange}
                value={values.taskDescription}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Task status
              </label>
              <select
                id="taskStatus"
                name="taskStatus"
                onChange={handleChange}
                value={values.taskStatus}
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value={TaskStatus[0]}>{TaskStatus[0]}</option>
                <option value={TaskStatus[1]}>{TaskStatus[1]}</option>
                <option value={TaskStatus[2]}>{TaskStatus[2]}</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Creating task...' : 'Create new task'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
