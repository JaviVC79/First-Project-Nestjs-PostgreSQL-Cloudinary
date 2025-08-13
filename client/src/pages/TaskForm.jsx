import { Form, Formik } from 'formik';
import { createTaskRequest } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const navigate = useNavigate();
  const { email, getUserTasks } = UseAuth();
  const TaskStatus = ['PENDING', 'IN_PROCESS', 'DONE'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <h2 className="text-white font-bold text-2xl sm:text-3xl mb-6">
        Add new task
      </h2>
      <Formik
        initialValues={{
          name: '',
          userEmail: email,
          taskDescription: '',
          taskStatus: TaskStatus[0],
        }}
        onSubmit={async (values, actions) => {
          getUserTasks([]);
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
            className="w-full max-w-lg bg-gray-900 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 text-white"
          >
            {/* Campo para el nombre de la tarea */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Task name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Write a name for your task"
                onChange={handleChange}
                value={values.name}
                className="shadow-sm appearance-none border-2 border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
              />
            </div>

            {/* Campo para la descripción de la tarea */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Task description
              </label>
              <textarea
                name="taskDescription"
                rows="4"
                placeholder="Write your description"
                onChange={handleChange}
                value={values.taskDescription}
                className="shadow-sm appearance-none border-2 border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 resize-none"
              />
            </div>

            {/* Campo para el estado de la tarea */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Task status
              </label>
              <select
                id="taskStatus"
                name="taskStatus"
                onChange={handleChange}
                value={values.taskStatus}
                className="block appearance-none w-full bg-gray-800 border-2 border-gray-700 text-gray-200 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={TaskStatus[0]}>{TaskStatus[0]}</option>
                <option value={TaskStatus[1]}>{TaskStatus[1]}</option>
                <option value={TaskStatus[2]}>{TaskStatus[2]}</option>
              </select>
            </div>

            {/* Botón de envío */}
            <div className="flex items-center justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

