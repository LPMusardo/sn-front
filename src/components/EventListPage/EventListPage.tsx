import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";
import FiltersToggle from "./FiltersToggle";
import ResultList from "./ResultList";
import SearchContextProvider from "./SearchContextProvider";
import EventListPageContent from "./EventListPageContent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EventListPage = () => {
  return (
    <SearchContextProvider>
      <EventListPageContent />
    </SearchContextProvider>
  );
};

export default EventListPage;
