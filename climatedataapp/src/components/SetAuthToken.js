import axios from 'axios';

//for creating collections
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["x-access-token"] = token;
   }
   else
       delete axios.defaults.headers.common["x-access-token"];
}