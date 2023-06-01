import { ReactElement, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import Axios from "../../services/caller.service";
import { useLogin } from "../LoginContextProvider"
import { CanceledError } from "axios";
import { NoteForm } from "./MyEventsContextProvider";


export interface NoteInterParticipation extends NoteForm {
  eventId: number;
}

export interface Note extends NoteInterParticipation {
  ownerId: number;
}



interface Response {
  user: {
    participantEvents: ParticipantEvent[];
  };
}

export interface ParticipantEvent {
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




const MyParticipationsContext = createContext<[ParticipantEvent[], boolean, string, (eventId: number) => void, (note: NoteInterParticipation) => void]>([
  [],
  false,
  "",
  () => { },
  () => { },
]);

export const useMyParticipations = () => {
  return useContext(MyParticipationsContext)
};


interface Props {
  children: ReactElement;
}

const MyParticipationsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<ParticipantEvent[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();


  const fetchData = (controller: AbortController, idUser: number) => {
    setError("");
    setLoading(true);
    return Axios.get<Response>(`/users`, {
      signal: controller.signal,
      params: { id: idUser, include_participantEvents: true },
    })
      .then((res) => {
        setEvents(res.data.user.participantEvents);
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


  function reFetchMyParticipations(): Promise<any> {
    const controller = new AbortController();
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again")
      return Promise.reject("problem with token, try to log-in again")
    }
    return fetchData(controller, user.id)
  }

  useEffect(() => {
    reFetchMyParticipations()
  }, []);


  const cancelParticipation = (eventId: number) => {
    setError("");
    const user = getUserData();
    if (!user) return
    setLoading(true);
    Axios.post(`/events/${eventId}/unparticipate`, {
    })
      .then((res) => {
        if (!res || !res.data) return;
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


  function addNote(note: NoteInterParticipation) {
    setError("");
    const user = getUserData();
    if (!user) {
      setError("problem with token, try to log-in again")
      return
    }
    const final_note: Note = { ...note, ownerId: user.id }
    console.log("FINAL NOTE:", final_note);
    setLoading(true);
    return Axios.post(`/notes/addnotefromparticipant`, final_note)
      .then((res) => {
        reFetchMyParticipations()
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

  return (
    <MyParticipationsContext.Provider value={[events, isLoading, error, cancelParticipation, addNote]}>
      {children}
    </MyParticipationsContext.Provider>
  );
};

export default MyParticipationsContextProvider;
