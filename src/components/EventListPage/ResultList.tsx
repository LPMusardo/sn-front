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
  Hide,
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

      <Hide above="md">
        <Grid
          templateColumns={{ sm: "1fr" }}
          gap={10}
          mx={{ sm: "5", lg: "100" }}
          my="35"
        >
          <GridItem>
            {isLoading && <Spinner />}
            <VStack spacing="5">
              {events.slice(0, Math.floor(events.length / 3)).map((event) => (
                <EventListingCard key={event.id} event={event} />
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Hide>

      <Show above="md">
        <Hide above="xl">
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
        </Hide>
      </Show>
      
      <Show above="xl">
        <Grid
          templateColumns={{ md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
          gap={10}
          mx={{ sm: "5", lg: "100" }}
          my="35"
        >
          <GridItem>
            {isLoading && <Spinner />}
            <VStack spacing="5">
              {events.slice(0, Math.ceil(events.length / 3)).map((event) => (
                <EventListingCard key={event.id} event={event} />
              ))}
            </VStack>
          </GridItem>
          <GridItem>
            {isLoading && <Spinner />}
            <VStack spacing="5">
              {events
                .slice(
                  Math.ceil(events.length / 3),
                  Math.ceil((events.length * 2) / 3)
                )
                .map((event) => (
                  <EventListingCard key={event.id} event={event} />
                ))}
            </VStack>
          </GridItem>
          <GridItem>
            {isLoading && <Spinner />}
            <VStack spacing="5">
              {events
                .slice(
                  Math.ceil((events.length * 2) / 3),
                  Math.ceil(events.length)
                )
                .map((event) => (
                  <EventListingCard key={event.id} event={event} />
                ))}
            </VStack>
          </GridItem>
        </Grid>
      </Show>
    </>
  );
};

export default ResultList;
