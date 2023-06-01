import { ReactElement } from "react";
import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchContext = createContext<[string, (data: string) => void]>([
  "",
  () => { },
]);

// async function sleep() {
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   console.log("5 seconds have passed.");
// }

interface Props {
  children: ReactElement;
}

const SearchContextProvider = ({ children }: Props) => {
  const [search, setSearch] = useState("");

  function setSearchState(data: string) {
    setSearch(data);
    //console.log("on change pour:", data);
  }

  return (
    <SearchContext.Provider value={[search, setSearchState]}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
