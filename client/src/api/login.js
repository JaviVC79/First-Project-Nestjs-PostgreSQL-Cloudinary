import axios from 'axios'
import Cookies from 'universal-cookie'



/**
 * Decodifica un JWT (JSON Web Token) a un objeto
 * @param {string} token
 * @returns {object}
 */
export function decodeJWT(token) {
    const base64Url = token.access_token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload).sub;
}


export const login = async (task) => {
    const response= await axios.post('http://localhost:3000/login', task)
    const jwt = response.data
    const cookies = new Cookies();
    cookies.set('jwt',jwt,{path: '/'});
    const userEmail = decodeJWT(jwt)
    const userDataSession = {userEmail, jwt}
    return userDataSession
}

