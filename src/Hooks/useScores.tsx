import { useEffect, useState, } from "react";
import Axios from "../services/caller.service";
import { CanceledError } from "axios";

interface Response {
  code: number;
  message: string;
  scores: UserScores;
}

export interface UserScores {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string;
  bio: string;
  avg_score_host: number | null;
  avg_score_participant: number| null;
}


const useScores = (userId: number): [UserScores, boolean, string] => {

  const [userScores, setUserScores] = useState<UserScores>({} as UserScores);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = (controller: AbortController) => {
    setError("");
    setLoading(true);
    return Axios.get<Response>(`/users/scores/${userId}`, { signal: controller.signal })
      .then((res) => {
        setUserScores(res.data.scores);
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



  return [userScores, isLoading, error];
};

export default useScores;
