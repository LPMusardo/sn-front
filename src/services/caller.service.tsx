import axios from "axios";
import { tokenService } from "../services/token.service";
import { useNavigate } from "react-router-dom";
import { ReactElement } from "react";
const Axios = axios.create({
  baseURL: "http://localhost:3000",
});

Axios.interceptors.request.use((request) => {
  if (tokenService.getToken) {
    request.headers.Authorization = "Bearer " + tokenService.getToken();
  }
  return request;
});


Axios.interceptors.response.use(
  (response) => { 
    return response
  },
  (error) => {
    console.log("AXIOS ERROR INTERCEPT---->", error);
    // const navigate = useNavigate();
    // navigate('/');
    if(!error || !error.response || ! error.response.status) return;
    const status = error.response.status;
    if (status === 401) {
      tokenService.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


// const API = ({ children }:{children:ReactElement}) => {
//   return <>{children}</>;
// };
// export {API};


export default Axios;
