import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useFetchSearch } from "../../EventListPage/FetchSearchContextProvider";

const SearchInput = () => {
  const [events, error, isLoading, fetchEvents] = useFetchSearch()
  const navigate = useNavigate();

  const [event_name, setEvent_name] = useState("");



  const onSubmit = () => {
    // console.log("Submit filters from OUTSIDE");
    // if(search){
    if (event_name) {
      // fetchEvents({event_name:search});
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ event_name: event_name })}`,
      });
      return;
    }
    fetchEvents({});
    navigate({
      pathname: "/search",
    });
  };



  return (
    <form onSubmit={onSubmit}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          onChange={(e) => {
            // setSearch(e.target.value);
            setEvent_name(e.target.value);
          }}
          // value={search}
          value={event_name}
          borderRadius={10}
          placeholder="Search events..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
