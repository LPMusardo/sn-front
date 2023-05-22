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
} from "@chakra-ui/react";
import LeftPanel from "../PublicUserPage/LeftPanel";
import RightPanel from "../PublicUserPage/RightPanel";
import EventListingCard from "./EventListingCard";

const ResultList = () => {
  return (
    <Grid
      templateColumns={{ sm: "1fr", md: "1fr 1fr" }}
      gap={10}
      mx={{ sm: "5", lg: "100" }}
      my="35"
    >
      <GridItem>
        <VStack spacing="5">
          <EventListingCard />
          <EventListingCard />
        </VStack>
      </GridItem>
      <GridItem>
        <VStack spacing="5">
          <EventListingCard />
          <EventListingCard />
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default ResultList;
