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
  givenNotes: Note[];
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
  target: User;
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



const MyGivenNotesContext = createContext<[()=>Note[], ()=>Note[], boolean, string, Note[]]>([()=>[], ()=>[], false,"", [] ]);

export const useMyGivenNotes = () => {
  return useContext(MyGivenNotesContext);
};

interface Props {
  children: ReactElement;
}

const MyGivenNotesContextProvider = ({ children }: Props) => {
  const [givenNotes, setGivenNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();

  const fetchData = (controller: AbortController, idUser: number) => {
    setLoading(true);
    Axios.get<Response>(`/users`, {
      signal: controller.signal,
      params: { id: idUser, include_givenNotes: true },
    })
      .then((res) => {
        if(!res || !res.data) return;
        console.log("GIVEN NOTES:", res.data.user.givenNotes);
        setGivenNotes([...res.data.user.givenNotes]);
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
    if (!user) {
      setError("error with dataUser, try log-in again")
      return;
    }
    fetchData(controller, user.id);
    return () => controller.abort();
  }, []);

  const participant_juge_organizer = 0
  const organizer_juge_participant = 1

  function get_reveived_notes_as_organiser(){
    return givenNotes.filter((givenNote)=>givenNote.type==organizer_juge_participant);
  }
  
  function get_reveived_notes_as_participant(){
    return givenNotes.filter((givenNote)=>givenNote.type==participant_juge_organizer);
  }


  return (
    <MyGivenNotesContext.Provider value={[get_reveived_notes_as_organiser, get_reveived_notes_as_participant, isLoading, error, givenNotes]}>
      {children}
    </MyGivenNotesContext.Provider>
  );
};

export default MyGivenNotesContextProvider;
