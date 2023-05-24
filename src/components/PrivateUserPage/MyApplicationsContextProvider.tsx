import { ReactElement, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import Axios from "../../services/caller.service";
import {useLogin} from "../LoginContextProvider"
import { CanceledError } from "axios";




interface Response {
  user: {
    candidateEvents: CandidateEvent[];
  };
}

export interface CandidateEvent {
  id: number;
  participants_number: number;
  category: string;
  description: string;
  image_url: string;
  name: string;
  date: string;
  creation_date: string;
  organizerId: number;
  MainCategoryId: number;
  AddressId: number;
  MainCategory: {
    id: number;
    name: string;
  };
  Address: {
    id: number;
    street: string;
    city: string;
    country: string;
    zip: string;
  };
}




const MyApplicationsContext = createContext<[CandidateEvent[], boolean, string, (eventId:number)=>void]>([
  [],
  false,
  "",
  () => {},
]);

export const useMyApplications = () => {
  return useContext(MyApplicationsContext)
};


interface Props {
  children: ReactElement;
}

const MyApplicationsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<CandidateEvent[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();


  const fetchData = (controller: AbortController, idUser:number) => {
    setLoading(true);
    return Axios.get<Response>(`/users`, {
      signal: controller.signal,
      params: {id:idUser, include_candidateEvents:true},
    })
      .then((res) => {
        setEvents(res.data.user.candidateEvents);
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const cancelApplication = (eventId:number) => {
    const user = getUserData();
    if(!user) return
    setLoading(true);
    Axios.post(`/events/${eventId}/unapply`, {
    })
      .then((res) => {
        const controller = new AbortController();
        fetchData(controller, user.id)
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
          setLoading(false);
        }
      })
  };

  useEffect(() => {
    const controller = new AbortController();
    const user = getUserData();
    if(!user) return
    fetchData(controller, user.id )
    return () => controller.abort();
  }, []);


  return (
    <MyApplicationsContext.Provider value={[events, isLoading, error, cancelApplication]}>
      {children}
    </MyApplicationsContext.Provider>
  );
};

export default MyApplicationsContextProvider;
