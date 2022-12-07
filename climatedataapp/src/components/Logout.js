import axios from 'axios';
 
export const logOut = () => {
    localStorage.clear()
    delete axios.defaults.headers.common["Authorization"];
}