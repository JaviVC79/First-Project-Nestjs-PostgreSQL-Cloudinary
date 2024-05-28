import { Form, Formik } from 'formik';
import { UseAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm.jsx';

function RegisterForm() {
  const { registerUser, userRegistered } = UseAuth();
  const [registered, setRegistered] = useState(userRegistered);
  useEffect(() => {
    setRegistered(userRegistered);
  }, [userRegistered]);
  console.log(`registerform ${registered}`)
  if (registered == 201) {
    return <LoginForm />;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
      }}
      onSubmit={async (values, actions) => {
        actions.resetForm();
        try {
          setRegistered(await registerUser(values));
        } catch (error) {
          console.log(error);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name || values.name == '') {
          errors.name = 'The name field is required.';
        }
        if (!values.email || values.email == '') {
          errors.email = 'The email field is required.';
        }
        if (!values.password || values.password == '') {
          errors.password = 'The password field is required.';
        }
        return errors;
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        errors,
        touched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <label>User email</label>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Username</label>
            <input
              type="name"
              name="name"
              placeholder="Write your NickName"
              onChange={handleChange}
              value={values.name}
            />
            {touched.name && errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Write your password"
              onChange={handleChange}
              value={values.password}
            />
            {touched.password && errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Try to register...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
export default RegisterForm;
