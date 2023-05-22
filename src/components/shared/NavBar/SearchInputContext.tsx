import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchContext } from "../../EventListPage/SearchContextProvider";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInputContext = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useContext(SearchContext)


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={10}
          placeholder="Search events..."
          variant="filled"
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInputContext;
