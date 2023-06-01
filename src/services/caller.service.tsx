import axios from "axios";
import { tokenService } from "../services/token.service";

const baseURL = "http://localhost:3000";

export const AxiosPure = axios.create({ baseURL });
const Axios = axios.create({ baseURL });

Axios.interceptors.request.use((request) => {
  if (tokenService.getToken) {
    request.headers.Authorization = "Bearer " + tokenService.getToken();
  }
  return request;
});


// Axios.interceptors.response.use(
//   (response) => { 
//     return response
//   },
//   (error) => {
//     console.log("AXIOS ERROR INTERCEPT---->", error);
//     if(!error || !error.response || ! error.response.status) return;


//       const user = getUserData();
//       console.log("DECODE TOKEN", user);
//       if(false){
//         tokenService.removeToken();
//         window.location.href = "/login";
//       }

//     return Promise.reject(error);
//   }
// );

// function getUserData() {
//   let user = null
//   let token = tokenService.getToken();
//   if(token) user = jwt_decode<{[key:string]:string}>(token)
//   return user;
// }

Axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("AXIOS ERROR INTERCEPT---->", error);
    // const navigate = useNavigate();
    // navigate('/');
    if (!error || !error.response || !error.response.status) return;
    const status = error.response.status;
    if (status === 401) {
      tokenService.removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default Axios;
