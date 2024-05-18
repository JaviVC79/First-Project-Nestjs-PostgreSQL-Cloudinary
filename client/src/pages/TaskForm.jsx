import { Form, Formik } from 'formik';
import { createTaskRequest } from '../api/task.api.js';

function TaskForm() {
  const TaskStatus = ['PENDING', 'IN_PROCESS', 'DONE'];
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          userEmail: '',
          taskDescription: '',
          taskStatus: TaskStatus[0],
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          actions.resetForm()
          try {
            const response = await createTaskRequest(values);
            console.log(response);
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
            {/*<label>User email</label>
            <input
              type="email"
              name="userEmail"
              placeholder="Write your email"
              onChange={handleChange}
              value={values.userEmail}
            />*/}
            <label>Task description</label>
            <textarea
              name="taskDescription"
              rows="3"
              placeholder="Write your description"
              onChange={handleChange}
              value={values.taskDescription}
            />
            <label>Task status</label>
            <select id="taskStatus" name="taskStatus" onChange={handleChange} value={values.taskStatus}>
              <option value={TaskStatus[0]}>{TaskStatus[0]}</option>
              <option value={TaskStatus[1]}>{TaskStatus[1]}</option>
              <option value={TaskStatus[2]}>{TaskStatus[2]}</option>
            </select>
            <button type="submit" disabled={isSubmitting}>{isSubmitting? "Creating task..." : "Create new task"}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
