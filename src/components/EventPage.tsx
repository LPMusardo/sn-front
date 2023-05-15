import { Box, Grid, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import Footer from "./Footer";
import CategoriesGrid from "../CategoriesGrid";
import NavBar from "./NavBar";
import { SoonGrid } from "./SoonGrid";
import EventDetailsPanel from "./EventDetailsPanel";
import EventImagePanel from "./EventImagePanel";

const EventPage = () => {
  return (
    <>
      <></>
      <NavBar onSearch={() => {}} />
      <SimpleGrid
        minChildWidth="md"
        spacing="10"
        padding="10"
        templateColumns={{
          lg: "2fr 1fr",
        }}
      >
        <GridItem width={"100%"}>
          <EventDetailsPanel />
        </GridItem>
          <EventImagePanel />
      </SimpleGrid>
      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default EventPage;
