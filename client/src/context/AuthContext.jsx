import { createContext, useState, useContext } from 'react'
import { login } from '../api/login.js';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be used whitin an AuthProvider")
    }
    return context
}


export const AuthProvider = ({children}) => {
    const [userJwt, setUserJwt] = useState([]);
    const [email, setEmail] = useState('')
    const signup = async (user) => {
        const res = await login(user);
        setUserJwt(res.jwt);
        setEmail(res.userEmail)}
    
    return(
        <AuthContext.Provider value= {{
            signup,
            userJwt,
            email,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
