import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FormEvent, useContext, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchContext } from "../../EventListPage/SearchContextProvider";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useFetchSearch} from "../../EventListPage/FetchSearchContextProvider";
import { FormulaireData, buildRequestObj } from "../../EventListPage/EventListPage"

const SearchInput = () => {
  const [events, error, isLoading, fetchEvents] = useFetchSearch()
  const [search, setSearch] = useContext(SearchContext);
  const navigate = useNavigate();

  
  const onSubmit = () => {
    console.log("submit form for search from outside");
    if(search){
      fetchEvents({event_name:search});
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ event_name:search})}`,
      });
      return;
    }
    fetchEvents({});
    navigate({
      pathname: "/search",
    });
    // const [searchParams, setSearchParams] = useSearchParams();
    // setSearchParams({ event_name:search});
  };



  return (
    <form onSubmit={ onSubmit }>
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

export default SearchInput;
