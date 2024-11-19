import { Route, Routes } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import LoginForm from '../LoginForm';
import TaskPage from '../TaskPage';
import TaskForm from '../TaskForm';
import NotFound from '../NotFound';
import GetAllTasks from '../GetAllTasks';
import RegisterForm from '../RegisterForm';
import PaymentForm from '../PaymentForm';

function AppRoutes() {
  const { email } = UseAuth();
  const [userEmail, setUserEmail] = useState(email);
  useEffect(() => {setUserEmail(email)}, [email]);

  return (
    <Routes>
      {userEmail === '' ? (
        <>
          <Route path="/" element={<TaskPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </>
      ) : (
        <>
          <Route path="/tasks" element={<GetAllTasks />} />
          <Route path="/newTask" element={<TaskForm />} />
          <Route path="/payments" element={<PaymentForm />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
    
  );
}
export default AppRoutes;
