import axios from "axios";
import { toast } from 'react-toastify';
import logger from './logService';

// handling unexpected error using axios interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
    // if we have a unexpected error then return a error msg
  if (!expectedError) {
   logger.log(error);
    toast.error("Unexpected error occur!...");
  }
  // otherwise return a rejected method in ccase of expected method
  return Promise.reject(error);
});

function setJwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
