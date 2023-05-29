import { ReactElement } from "react";
import { createContext, useState } from "react";

export const MainCategoryContext = createContext<[string, (data: string) => void]>([
  "",
  () => {},
]);

interface Props {
  children: ReactElement;
}

const MainCategoryContextProvider = ({ children }: Props) => {
  const [search, setSearch] = useState("");

  function setSearchState(data: string) {
    setSearch(data);
  }

  return (
    <MainCategoryContext.Provider value={[search, setSearchState]}>
      {children}
    </MainCategoryContext.Provider>
  );
};

export default MainCategoryContextProvider;
