import { ReactElement, useContext } from "react";
import { createContext, useState } from "react";
import { tokenService } from "../services/token.service";
import { useNavigate } from "react-router-dom";
import {AxiosPure} from "../services/caller.service";


import jwt_decode from "jwt-decode";

const LoginContext = createContext<[boolean, boolean, string|null, (credentials:{email: string; password: string;})=>void, Function,  ()=>{[key:string]:any}|null         ] >([false, false, null, ()=>{}, ()=>{}, ()=>{return null} ]);




export function useLogin() {
  return useContext(LoginContext);
}

const LoginContextProvider = ({children}: {children:JSX.Element} ) => {
  const navigate = useNavigate();
  const [isLogged, setLogin] = useState(tokenService.getToken()!=null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function login(credentials: {email: string;password: string;}) {
    setLoading(true);
    AxiosPure.post("/users/login", credentials)
      .then((res) => {
        setError("")
        tokenService.saveToken(res.data.token);
        setLogin(true);
        navigate("/profile/1");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Email or password incorrect")
        setLoading(false);
      });
    return { isLogged, error, isLoading };
  }

  function logout() {
    tokenService.removeToken();
    setLogin(false);
    navigate("/");
  }


  function getUserData() {
    let user = null
    let token = tokenService.getToken();
    if(token) user = jwt_decode<{[key:string]:string}>(token)
    // if(typeof user == "string") return null;
    return user;
  }
  

  return (
    <LoginContext.Provider value={[isLogged, isLoading, error, login, logout, getUserData]}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
