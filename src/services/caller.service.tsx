import axios from "axios";
import { tokenService } from "./token.service";

const Axios = axios.create({
  baseURL: "http://localhost:3000",
});

Axios.interceptors.request.use((request) => {
  if (tokenService.getToken) {
    request.headers.Authorization = "Bearer " + tokenService.getToken();
  }

  return request;
});

export default Axios;
