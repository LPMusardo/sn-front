import { Box, Grid, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import EventDetailsPanel from "./EventDetailsPanel";
import EventImagePanel from "./EventImagePanel";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar/NavBar";

const EventPage = () => {
  return (
    <>
      <NavBar onSearch={() => {}} />
      <Box minH="70vh">
        <SimpleGrid
          gridAutoRows="1fr"
          minChildWidth="md"
          spacing="10"
          padding="10"
          templateColumns={{
            lg: "2fr 1fr",
          }}
        >
          <GridItem>
            <EventDetailsPanel />
          </GridItem>
          <GridItem>
            <EventImagePanel />
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box marginTop={100}>
        <Footer />
      </Box>
    </>
  );
};

export default EventPage;
