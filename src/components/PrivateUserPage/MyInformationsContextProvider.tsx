import { ReactElement, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import Axios from "../../services/caller.service";
import { useLogin } from "../LoginContextProvider";
import { AxiosResponse, CanceledError } from "axios";

interface Response {
  code: number;
  message: string;
  user: User;
}

interface User {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string | null;
  bio: string;
}

interface UserWithoutNull {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string;
  bio: string;
}

interface UserSubmit {
  email: string;
  bio: string;
  password: {
    password: string;
    confirmpassword: string;
  };
  username: string;
  picture: string;
}

interface UserForm {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string;
  bio: string;
  password: string,
  confirmpassword: string,
}

let resetForm: (data: {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string;
  bio: string;
  password: string,
  confirmpassword: string,
}) => void;


const MyInformationsContext = createContext<
  [User, boolean, string, (data: UserSubmit) => void, (reset: (data: UserForm) => any) => void]
>([
  {
    id: 0,
    username: "",
    email: "",
    creation_date: "",
    picture: "",
    bio: "",
  },
  false,
  "",
  () => { },
  () => { },
]);

export const useMyInformations = () => {
  return useContext(MyInformationsContext);
};

function getUserWithoutNull(user: User): UserWithoutNull {
  return user.picture !== null
    ? (user as UserWithoutNull)
    : { ...user, picture: "" };
}


interface Props {
  children: ReactElement;
}

const MyInformationsContextProvider = ({ children }: Props) => {
  const [initialData, setInitialData] = useState<User>({
    id: 0,
    username: "",
    email: "",
    creation_date: "",
    picture: "",
    bio: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();

  function setDefaultFormValues(reset: (data: UserForm) => any) {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with userData, try log-in again");
      return;
    }
    setLoading(true);
    Axios.get<Response>(`/users`, { params: { id: user.id }, })
      .then((res) => {
        if (!res || !res.data) return;
        setInitialData(res.data.user);
        reset({ ...getUserWithoutNull(res.data.user), password: "", confirmpassword: "" });
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // const fetchData = (idUser: number) => {

  // };

  // useEffect(() => {
  // }, []);

  function submitUser(data: UserSubmit) {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with userData, try log-in again");
      return;
    }
    setLoading(true);
    return Axios.patch(`/users/${user.id}`, data)
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <MyInformationsContext.Provider value={[initialData, isLoading, error, submitUser, setDefaultFormValues]}>
      {children}
    </MyInformationsContext.Provider>
  );
};

export default MyInformationsContextProvider;
