import { ReactElement, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import Axios from "../../services/caller.service";
import { useLogin } from "../LoginContextProvider";
import { CanceledError } from "axios";

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
  bio: string | null;
  receivedNotes: Note[];
}

interface Note {
  id: number;
  creationDate: string;
  title: string;
  comment: string | null;
  value: number;
  type: number;
  ownerId: number;
  targetId: number;
  eventId: number;
  owner: User;
  event: Event;
}

interface Event {
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
}



const MyReceivedNotesContext = createContext<[()=>Note[], ()=>Note[], boolean, string]>([()=>[], ()=>[], false, ""]);

export const useMyReceivedNotes = () => {
  return useContext(MyReceivedNotesContext);
};

interface Props {
  children: ReactElement;
}

const MyReceivedNotesContextProvider = ({ children }: Props) => {
  const [receivedNotes, setReceivedNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();

  const fetchData = (controller: AbortController, idUser: number) => {
    setLoading(true);
    return Axios.get<Response>(`/users`, {
      signal: controller.signal,
      params: { id: idUser, include_receivedNotes: true },
    })
      .then((res) => {
        if(!res || !res.data) return;
        setReceivedNotes(res.data.user.receivedNotes);
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

  useEffect(() => {
    const controller = new AbortController();
    const user = getUserData();
    if (!user) return;
    fetchData(controller, user.id);
    return () => controller.abort();
  }, []);

  const participant_juge_organizer = 0
  const organizer_juge_participant = 1

  function get_reveived_notes_as_organiser(){
    return receivedNotes.filter((receivedNote)=>receivedNote.type==participant_juge_organizer);
  }
  
  function get_reveived_notes_as_participant(){
    return receivedNotes.filter((receivedNote)=>receivedNote.type==organizer_juge_participant);
  }
  
  
  return (
    <MyReceivedNotesContext.Provider value={[get_reveived_notes_as_organiser, get_reveived_notes_as_participant, isLoading, error]}>
      {children}
    </MyReceivedNotesContext.Provider>
  );
};

export default MyReceivedNotesContextProvider;
