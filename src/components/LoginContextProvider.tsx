import { ReactElement, useContext } from "react";
import { createContext, useState } from "react";
import { tokenService } from "../services/token.service";
import { useNavigate } from "react-router-dom";
import Axios from "../services/caller.service";

const LoginContext = createContext<[boolean, boolean, string|null, (credentials:{email: string;password: string;})=>void, Function]>([false, false, null, ()=>{}, ()=>{}]);



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
    Axios.post("/users/login", credentials)
      .then((res) => {
        setError("")
        tokenService.saveToken(res.data.token);
        setLogin(true);
        navigate("/profile/1");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message)
        setLoading(false);
      });
    return { isLogged, error, isLoading };
  }

  function logout() {
    tokenService.removeToken();
    setLogin(false);
    navigate("/");
  }

  return (
    <LoginContext.Provider value={[isLogged, isLoading, error, login, logout]}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
