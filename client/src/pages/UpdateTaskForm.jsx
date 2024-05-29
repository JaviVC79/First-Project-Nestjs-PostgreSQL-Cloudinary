import { Form, Formik } from 'formik';
import { updateTaskRequest } from '../api/task.api.js';
import { UseAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';


function UpdateTaskForm() {
  let { id } = useParams();
  const { email } = UseAuth();
  const TaskStatus = ['PENDING', 'IN_PROCESS', 'DONE'];
  return (
    <div>
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
            await updateTaskRequest(values, id);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>Task name</label>
            <input
              type="text"
              name="name"
              placeholder="Write a name for your task"
              onChange={handleChange}
              value={values.name}
            />
            <label>Task description</label>
            <textarea
              name="taskDescription"
              rows="3"
              placeholder="Write your description"
              onChange={handleChange}
              value={values.taskDescription}
            />
            <label>Task status</label>
            <select
              id="taskStatus"
              name="taskStatus"
              onChange={handleChange}
              value={values.taskStatus}
            >
              <option value={TaskStatus[0]}>{TaskStatus[0]}</option>
              <option value={TaskStatus[1]}>{TaskStatus[1]}</option>
              <option value={TaskStatus[2]}>{TaskStatus[2]}</option>
            </select>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating task...' : 'Create new task'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateTaskForm;
