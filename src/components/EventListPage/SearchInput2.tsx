import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchContext } from "./SearchContextProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { FormulaireData, buildRequestObj } from "./EventListPage"
import { useFetchSearch } from "./FetchSearchContextProvider";

const SearchInput2 = () => {

  const { handleSubmit } = useFormContext<FormulaireData>();
  const [search, setSearch] = useContext(SearchContext);
  const [events, error, isLoading, fetchEvents] = useFetchSearch()
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (formObj: FormulaireData) => {
   // console.log("Submit filters from SEARCHINPUT2", buildRequestObj(formObj));
    // fetchEvents(buildRequestObj(formObj));
    setSearchParams(buildRequestObj(formObj));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          borderRadius={10}
          placeholder="Search events..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput2;
