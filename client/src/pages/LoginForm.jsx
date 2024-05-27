import { Form, Formik } from 'formik';
import { useAuth } from '../context/AuthContext'



function LoginForm() {
  const { signup } = useAuth()

  if (email) {
    return <Redirect to="/tasks" />;
  }
  
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          
        }}
        onSubmit={async (values, actions) => {
          //console.log(values);
          actions.resetForm();
          try {
            await signup(values);
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
