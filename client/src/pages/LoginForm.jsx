
import { Form, Formik } from 'formik';
import { UseAuth } from '../context/AuthContext';
//import { useEffect, useState } from 'react';
//import GetAllTasks from './GetAllTasks.jsx';
import {Navigate} from 'react-router-dom'

function LoginForm() {
  const { signup, email } = UseAuth();
  //const { userJwt } = UseAuth();
  //const [ jwt, setJwt] = useState(userJwt);
  /*useEffect(() => {
    setJwt(userJwt)
  }, [userJwt]);*/
  //console.log(`loginform ${typeof(jwt)}`)
  /*if (jwt !== undefined && jwt !=='') {
    return <GetAllTasks />;
  }*/
  if (email) {
    return <Navigate to="/tasks" />;
  }
 
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          try {
            signup(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>User email</label>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              onChange={handleChange}
              value={values.email}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Write your password"
              onChange={handleChange}
              value={values.password}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Try to login...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
