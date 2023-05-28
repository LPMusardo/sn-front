import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  Stack,
  Image,
  Text,
  Divider,
  ButtonGroup,
  Center,
  Show,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import LeftPanel from "../PublicUserPage/LeftPanel";
import RightPanel from "../PublicUserPage/RightPanel";
import EventListingCard from "./EventListingCard";
import { useFetchSearch } from "./FetchSearchContextProvider";

const ResultList = () => {
  const [events, error, isLoading, fetchEvents] = useFetchSearch();

  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr" }}
        gap={10}
        mx={{ sm: "5", lg: "100" }}
        my="35"
        >
        <GridItem>
        {isLoading && <Spinner />}
          <VStack spacing="5">
            {events.slice(0, Math.ceil(events.length / 2)).map((event) => (
              <EventListingCard key={event.id} event={event} />
              ))}
          </VStack>
        </GridItem>
        <GridItem>
        {isLoading && <Spinner />}
          <VStack spacing="5">
            {events.slice(Math.ceil(events.length / 2)).map((event) => (
              <EventListingCard key={event.id} event={event} />
              ))}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default ResultList;
