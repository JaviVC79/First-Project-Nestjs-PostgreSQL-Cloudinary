import Cookies from 'universal-cookie';
import { createContext, useState, useEffect, useContext } from 'react';
import { login, decodeJWT } from '../api/login.js';
import { register } from '../api/register.js';

export const AuthContext = createContext();

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userJwt, setUserJwt] = useState('');
  const [email, setEmail] = useState('');
  const [userRegistered, setUserRegistered] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    if (jwt) {
      const userEmail = decodeJWT(jwt);
      setUserJwt(jwt);
      setEmail(userEmail);
    }
  }, []);

  const signup = async (user) => {
    try {
      const res = await login(user);
      setUserJwt(res.jwt);
      setEmail(res.userEmail);
      setUserRegistered(201);
    } catch (error) {
      setUserRegistered(error.response.status);
      console.error(error);
    }
  };

  const registerUser = async (user) => {
    const registerNow = await register(user);
    setUserRegistered(registerNow);
  };

  useEffect(() => {
    if (userRegistered != 201) {
      const timer = setTimeout(() => setUserRegistered(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [userRegistered]);

  const logOut = () => {
    window.document.cookie =
      'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    setUserJwt(undefined);
    setEmail('');
    setUserRegistered(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        userJwt,
        email,
        logOut,
        registerUser,
        userRegistered,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
