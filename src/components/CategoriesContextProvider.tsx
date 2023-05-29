import { ReactElement, useContext, useEffect, createContext, useState,
} from "react";
import Axios from "../services/caller.service";
import { CanceledError } from "axios";


interface Response {
  code: number;
  message: string;
  categories: Category[];
}
export interface Category {
  id: number;
  name: string;
}

const CategoriesContext = createContext<[Category[], boolean, string]>([[], false, ""]);

export const useCategories = () => {
  return useContext(CategoriesContext);
};

interface Props {
  children: ReactElement;
}

const CategoriesContextProvider = ({ children }: Props) => {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = (controller: AbortController) => {
    setError("");
    setLoading(true);
    return Axios.get<Response>(`/categories`, {signal: controller.signal})
      .then((res) => {
        setCategories(res.data.categories);
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

  

  return (
    <CategoriesContext.Provider value={[categories, isLoading, error]}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
