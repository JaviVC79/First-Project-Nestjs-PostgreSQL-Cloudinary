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
  if (registered == 201) {
    return <LoginForm />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-white font-bold text-lg">Register</h2>
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
          <Form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User email
              </label>
              <input
                autoComplete="username"
                type="email"
                name="email"
                placeholder="Write your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                autoComplete="username"
                type="name"
                name="name"
                placeholder="Write your NickName"
                onChange={handleChange}
                value={values.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                autoComplete="current-password"
                type="password"
                name="password"
                placeholder="Write your password"
                onChange={handleChange}
                value={values.password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? 'Try to register...' : 'Register'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
