import axios from 'axios';
 
export const logOut = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"];
}