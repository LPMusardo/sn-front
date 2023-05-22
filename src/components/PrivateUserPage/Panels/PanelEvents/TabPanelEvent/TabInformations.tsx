import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  VStack,
  Image,
  Square,
  Link,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import IEvent from "../IEvent";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";

interface Props {
  event: IEvent;
}

const TabInformations = ({event}:Props) => {
  return (
    <TabPanel>
      <HStack>
        <VStack spacing="4" mr="8">
          <Box w="250px" h="250px">
            <Image
              h="100%"
              w="100%"
              objectFit="contain"
              src={event.imageURL}
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Box>
          <Link href="/">link/vers/page/events/{event.id}</Link>
        </VStack>
        <VStack spacing="3" alignItems="start">
          <HStack>
            <BsCalendarEvent />
            <Text>{event.date}</Text>
          </HStack>
          <HStack>
            <RiGroupLine />
            <Text>
              {event.number}/{event.size}
            </Text>
          </HStack>
          <HStack>
            <FiMapPin />
            <Text>{event.address}</Text>
          </HStack>
          <HStack>
            <BiCategoryAlt />
            <Text>{event.mainCategory}</Text>
            <Text> - </Text>
            <Text>{event.category}</Text>
          </HStack>
          <HStack mt="4" maxW="2xl">
            <Box>
              <BsChatSquareText />
            </Box>
            <Text>{event.description}</Text>
          </HStack>
          <Text>{event.creationDate}</Text>
        </VStack>
      </HStack>
    </TabPanel>
  );
};

export default TabInformations;
