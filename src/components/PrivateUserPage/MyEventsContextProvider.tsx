import { CanceledError } from "axios";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Axios from "../../services/caller.service";
import { useLogin } from "../LoginContextProvider";

interface Response {
  user: Organizer;
}
export interface Organizer extends User {
  organizedEvents: OrganizedEvent[];
}
export interface User {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string;
  bio: string;
}
export interface OrganizedEvent {
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
  participants: User[];
  candidates: User[];
}

export interface NoteForm {
  value: number;
  title: string;
  comment: string;
}
export interface NoteInter extends NoteForm {
  eventId: number;
  targetId: number;
}
export interface Note extends NoteInter {
  ownerId: number;
}

export interface NewEvent {
  participants_number: number;
  category: string;
  description: string;
  image_url: string;
  name: string;
  date: string;
  address: {
    street: string;
    city: string;
    country: string;
    zip: number;
  };
  mainCategoryId: number;
}

const MyEventsContext = createContext<
  [
    OrganizedEvent[],
    boolean,
    string,
    (note: NoteInter) => void,
    (note: NewEvent) => void,
    (eventId: number, userId: number) => Promise<any>,
    (eventId: number, userId: number) => Promise<any>
  ]
>([
  [],
  false,
  "",
  () => { },
  () => { },
  () => Promise.resolve(),
  () => Promise.resolve(),
]);

export const useMyEvents = () => {
  return useContext(MyEventsContext);
};

interface Props {
  children: ReactElement;
}

const MyEventsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<OrganizedEvent[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();

  const fetchData = (controller: AbortController, idUser: number) => {
    setError("");
    setLoading(true);
    return Axios.get<Response>(`/users`, {
      signal: controller.signal,
      params: { id: idUser, include_organizedEvents: true },
    })
      .then((res) => {
        setEvents(res.data.user.organizedEvents);
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

  // const cancelParticipation = (eventId:number) => {
  //   const user = getUserData();
  //   if(!user) return
  //   setLoading(true);
  //   Axios.post(`/events/${eventId}/unparticipate`, {
  //   })
  //     .then((res) => {
  //       const controller = new AbortController();
  //       fetchData(controller, user.id)
  //     })
  //     .catch((err) => {
  //       if (!(err instanceof CanceledError)) {
  //         setError(err.message);
  //         setLoading(false);
  //       }
  //     })
  // };

  useEffect(() => {
    reFetchMyEvents();
  }, []);

  function reFetchMyEvents(): Promise<any> {
    const controller = new AbortController();
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again");
      return Promise.reject("problem with token, try to log-in again");
    }
    return fetchData(controller, user.id);
  }

  function addNote(note: NoteInter) {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again");
      return;
    }
    const final_note: Note = { ...note, ownerId: user.id };
    console.log("FINAL NOTE:", final_note);
    setError("");
    setLoading(true);
    return Axios.post(`/notes/addnotefromhost`, final_note)
      .then((res) => {
        reFetchMyEvents();
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

  function submitNewEvent(newEvent: NewEvent) {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again");
      return;
    }
    setLoading(true);
    return Axios.post(`/events/create`, newEvent)
      .then((res) => {
        reFetchMyEvents();
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

  function accept(eventId: number, userId: number): Promise<any> {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again");
      return Promise.reject("problem with token, try to log-in again");
    }
    setLoading(true);
    return Axios.post(`/events/${eventId}/accept/${userId}`)
      .then((res) => {
        setLoading(false);
        return reFetchMyEvents();
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
          setLoading(false);
          return Promise.reject(err.message);
        }
      });
  }

  function refuse(eventId: number, userId: number) {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again");
      return Promise.reject("problem with token, try to log-in again");
    }
    setLoading(true);
    return Axios.post(`/events/${eventId}/refuse/${userId}`)
      .then((res) => {
        setLoading(false);
        return reFetchMyEvents();
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.message);
          setLoading(false);
          return Promise.reject(err.message);
        }
      });
  }

  return (
    <MyEventsContext.Provider
      value={[
        events,
        isLoading,
        error,
        addNote,
        submitNewEvent,
        accept,
        refuse,
      ]}
    >
      {children}
    </MyEventsContext.Provider>
  );
};

export default MyEventsContextProvider;
