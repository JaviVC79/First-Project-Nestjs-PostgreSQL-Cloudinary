import { Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import TaskPage from './pages/TaskPage';
import TaskForm from './pages/TaskForm';
import NotFound from './pages/NotFound';
import Navbar from './Components/Navbar';
import { AuthProvider } from './context/AuthContext';
import GetAllTasks from './pages/GetAllTasks';
import GetOneTask from './pages/GetOneTask';
import RegisterForm from './pages/RegisterForm';
import UpdateTaskForm from './pages/UpdateTaskForm';
import SendImageForm from './pages/SendImageForm';
import PaymentForm from './pages/PaymentForm'

function App() {
  return (
    <div className="bg-zinc-700 h-screen">
      <div className="container mx-auto py-4">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<TaskPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/tasks" element={<GetAllTasks />} />
            <Route path="/task" element={<GetOneTask />} />
            <Route path="/newTask" element={<TaskForm />} />
            <Route path="/updateTasks/:id" element={<UpdateTaskForm />} />
            <Route path="/sendImage/:id" element={<SendImageForm />} />
            <Route path="/payments" element={<PaymentForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
