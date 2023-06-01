import {
  ReactElement,
  useContext,
  createContext,
  useState,
} from "react";
import Axios from "../../services/caller.service";
import { CanceledError } from "axios";

const FetchSearchContext = createContext<
  [Event[], string, boolean, (filtersObj: Filters) => void]
>([[], "", false, () => { }]);

export const useFetchSearch = () => useContext(FetchSearchContext);

interface Response {
  code: number;
  message: string;
  events: Event[];
}
export interface Event {
  id: number;
  name: string;
  participants_number: number;
  category: string;
  description: string;
  image_url: string;
  date: string;
  MainCategoryId: number;
  nb_places_left: number;
  organizer: {
    id: number;
    username: string;
    bio: string;
    creation_date: string;
    picture: string | null;
    score_host: string | null;
  };
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

type Filters = {
  event_name?: string;
  description?: string;
  category?: string;
  MainCategoryId?: string;
  range_date_min?: string;
  range_date_max?: string;
  range_places_min?: number;
  range_places_max?: number;
  street?: string;
  city?: string;
  country?: string;
  zip?: string;
  username?: string;
  nb_places_wanted?: number;
  score_host_min?: number;
};

interface Props {
  children: ReactElement;
}

const FetchSearchContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchData = (filtersObj: Filters, controller: AbortController) => {
    setError("");
    setLoading(true);
    return Axios.get<Response>(`/events/search`, {
      signal: controller.signal,
      params: filtersObj,
    })
      .then((res) => {
        console.log(res.data.events);
        setEvents(res.data.events);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

  function fetchEvents(filtersObj: Filters) {
    const controller = new AbortController();
    fetchData(filtersObj, controller);
    return () => {
      controller.abort();
    };
  }

  return (
    <FetchSearchContext.Provider
      value={[events, error, isLoading, fetchEvents]}
    >
      {children}
    </FetchSearchContext.Provider>
  );
};

export default FetchSearchContextProvider;
