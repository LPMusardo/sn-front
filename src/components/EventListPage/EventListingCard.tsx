import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Show,
  Stack,
  Text
} from "@chakra-ui/react";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { Link as ReachLink } from "react-router-dom";
import Rating from "../shared/Rating";
import { Event } from "./FetchSearchContextProvider";

interface Props {
  event: Event;
}

const EventListingCard = ({ event }: Props) => {
  return (
    <Card
      variant="elevated"
      w="100%"
      h="100%"
      maxW="md"
      size={"md"}
    >
      <Show above="sm">
        <Box className="square" /*outline={"2px solid green"}*/ overflow="hidden">
          <Image
            //outline={"3px solid red"}
            className="image"
            src={event.image_url}
            borderRadius="lg"
            objectFit="cover"
            fallbackSrc="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
          // fallbackSrc="https://via.placeholder.com/150"
          // fallbackSrc="https://cdn.cdkeys.com/700x700/media/catalog/product/b/a/babylons-fall-pc-game-steam-cover_2_.jpg"
          />
        </Box>
      </Show>

      <Stack w="100%">
        <CardBody pb="0" w="100%">
          <Heading size="lg">{event.name}</Heading>

          <Flex
            flex="1"
            gap="4"
            alignItems="center"
            flexWrap="wrap"
            mt="2"
            mb="5"
          >
            <Avatar
              name={event.organizer.username}
              src={event.organizer.picture || ""}
              size="sm"
            />
            <HStack>
              <Link as={ReachLink} to={`/users/${event.organizer.id}`} >
                <Heading size="xs">{event.organizer.username}</Heading>
              </Link>
              {event.organizer.score_host && <Rating score={Number.parseInt(event.organizer.score_host)} total={5} spacing={0}></Rating>}
            </HStack>
          </Flex>

          <Flex justifyContent="space-between">
            <HStack>
              <BsCalendarEvent />
              <Text>{new Date(event.date).toLocaleString()}</Text>
            </HStack>
            <HStack>
              <RiGroupLine />
              <Text>{`${event.participants_number - event.nb_places_left}/${event.participants_number}`}</Text>
            </HStack>
          </Flex>
          <HStack>
            <Box w="auto">
              <FiMapPin />
            </Box>
            <Text>{`${event.Address.street} ${event.Address.city} ${event.Address.zip} ${event.Address.country}`}</Text>
          </HStack>
          <HStack>
            <BiCategoryAlt />
            <Text>{`${event.MainCategory.name} - ${event.category}`}</Text>
          </HStack>

          <HStack mt="4" alignItems="center">
            <BsChatSquareText />
            <Text>{`${event.description.slice(0, 35).trim()}...`}</Text>
          </HStack>
          {/* <Text>SEE MORE FOR : adresse complète; #deja inscrit; messages</Text> */}
        </CardBody>

        <CardFooter pt="4">
          <Link as={ReachLink} to={`/events/${event.id}`} color="#2256A0">
            <Text>See More</Text>
          </Link>

        </CardFooter>
      </Stack>
    </Card>
  );
};

export default EventListingCard;
