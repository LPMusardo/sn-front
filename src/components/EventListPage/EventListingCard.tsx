import {
  Card,
  Show,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  Avatar,
  Box,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";

const EventListingCard = () => {
  return (
    <Card
      direction={{ sm: "column", xl: "row" }}
      overflow="scroll"
      variant="elevated"
      maxH={{ sm: "100%", xl: "350" }}
      size={"md"}
    >
      <Show above="sm">
        <Image
          objectFit="cover"
          maxW={{ sm: "100%", xl: "50%" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        />
      </Show>

      <Stack w="100%">
        <CardBody pb="0" w="100%">
          <Heading size="lg">Click Name</Heading>

          <Flex
            flex="1"
            gap="4"
            alignItems="center"
            flexWrap="wrap"
            mt="2"
            mb="5"
          >
            <Avatar
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              size="sm"
            />
            <Box>
              <Heading size="xs">Segun Adebayo</Heading>
            </Box>
          </Flex>

          <Flex justifyContent="space-between">
            <HStack>
              <BsCalendarEvent />
              <Text>12/02/2023</Text>
            </HStack>
            <HStack>
              <RiGroupLine />
              <Text>10</Text>
            </HStack>
          </Flex>
          <HStack>
            <FiMapPin />
            <Text>France, Marseille</Text>
          </HStack>
          <HStack>
            <BiCategoryAlt />
            <Text>Sports - Karting</Text>
          </HStack>

          <HStack mt="4" alignItems="center">
            <BsChatSquareText />
            <Text>35 premiers charactères puis...</Text>
          </HStack>
          {/* <Text>SEE MORE FOR : adresse complète; #deja inscrit; messages</Text> */}
        </CardBody>

        <CardFooter pt="4">
          <Button variant="link" colorScheme="blue">
            See More
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default EventListingCard;
