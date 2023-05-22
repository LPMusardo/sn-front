import { Box, Button, Center, Flex, Grid, GridItem } from "@chakra-ui/react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import FiltersToggle from "./FiltersToggle";
import ResultList from "./ResultList";
import { SearchContext } from "./SearchContextProvider";
import { useContext, useEffect } from "react";
import SearchInputContext from "../shared/NavBar/SearchInputContext";
import { useLocation, useParams } from "react-router-dom";

const EventListPage = () => {
  const [search, setSearch] = useContext(SearchContext);

  const location = useLocation();
  const eventName = new URLSearchParams(location.search).get("eventName");

  useEffect(() => {
    if (eventName == undefined) {
      setSearch("vide");
      return;
    }
    setSearch(eventName);
  }, []);

  return (
    <>
      <NavBar
        onSearch={() => {}}
        searchInput={<SearchInputContext onSearch={() => {}} />}
      />

      <Box margin={5} minH="60vh">
        <FiltersToggle />
        <ResultList />
      </Box>

      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default EventListPage;
