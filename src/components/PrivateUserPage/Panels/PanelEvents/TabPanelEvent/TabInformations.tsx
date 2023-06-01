import {
  Text,
  Box,
  HStack,
  VStack,
  Image,
  Link,
  TabPanel,
  Square,
} from "@chakra-ui/react";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { OrganizedEvent } from "../../../MyEventsContextProvider";
import { Link as ReachLink } from "react-router-dom";

interface Props {
  event: OrganizedEvent;
}

const TabInformations = ({ event }: Props) => {
  return (
    <TabPanel>
      <HStack>
        <VStack spacing="4" mr="8">
          <Square size="250px">
            <Image
              h="100%"
              w="100%"
              objectFit="cover"
              src={event.image_url}
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Square>
          <Link as={ReachLink} to={`/events/${event.id}`}>
            <Text color="#2256A0" size="sm">
              See more
            </Text>
          </Link>
        </VStack>
        <VStack spacing="3" alignItems="start">
          <HStack>
            <BsCalendarEvent />
            <Text>{new Date(event.date).toLocaleString()}</Text>
          </HStack>
          <HStack>
            <RiGroupLine />
            <Text>
              {`${event.participants.length} / ${event.participants_number}`}
            </Text>
          </HStack>
          <HStack>
            <FiMapPin />
            <HStack spacing="5">
              <Text>{event.Address.street}</Text>
              <Text>{event.Address.city}</Text>
              <Text>{event.Address.zip}</Text>
              <Text>{event.Address.country}</Text>
            </HStack>
          </HStack>
          <HStack>
            <BiCategoryAlt />
            <Link
              as={ReachLink}
              to={`/search?MainCategoryId=${event.MainCategory.id}`}
            >
              <Text>{event.MainCategory.name}</Text>
            </Link>

            <Text> - </Text>
            <Text>{event.category}</Text>
          </HStack>
          <HStack mt="4" maxW="2xl">
            <Box>
              <BsChatSquareText />
            </Box>
            <Text>{event.description}</Text>
          </HStack>
          <Text>{new Date(event.creation_date).toLocaleString()}</Text>
        </VStack>
      </HStack>
    </TabPanel>
  );
};

export default TabInformations;
