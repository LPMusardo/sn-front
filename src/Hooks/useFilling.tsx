import {
  ReactElement, useContext, useEffect, createContext, useState,
} from "react";
import Axios from "../services/caller.service";
import { CanceledError } from "axios";


export interface EventFilling {
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
  nb_participants: number;
  nb_candidats: number;
}

interface Response {
  code: number;
  message: string;
  events: EventFilling; //events mais en réalisté c'est un seul event
}


const useFilling = (eventId: number): [EventFilling, boolean, string] => {

  const [eventFilling, setEventFilling] = useState<EventFilling>({ nb_participants: -1, nb_candidats: -1 } as EventFilling);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = (controller: AbortController) => {
    setError("");
    setLoading(true);
    return Axios.get<Response>(`/events/get_filling_event`, { signal: controller.signal, params: { eventId } })
      .then((res) => {
        setEventFilling(res.data.events);
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
    fetchData(controller);
  }, []);



  return [eventFilling, isLoading, error];
};

export default useFilling;
