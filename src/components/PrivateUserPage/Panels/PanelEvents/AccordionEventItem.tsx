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
import IEvent from "./IEvent";
import { BsCalendarEvent, BsChatSquareText } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import TabInformations from "./TabPanelEvent/TabInformations";
import TabCandidats from "./TabPanelEvent/TabCandidats";
import TabParticipants from "./TabPanelEvent/TabParticipants";
import { Dispatch, SetStateAction } from "react";

interface Props {
  event: IEvent;
  //setEvents : Dispatch<SetStateAction<IEvent[]>>
}

const AccordionEventItem = ({ event }: Props) => {
  return (
    <AccordionItem
      my="2"
      mx="4"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      borderWidth="1px"
    >
      <h2>
        <AccordionButton>
          <Heading size="md">{event.name}</Heading>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Tabs>
          <TabList>
            <Tab>Informations</Tab>
            <Tab>Candidats</Tab>
            <Tab>Participants</Tab>
          </TabList>

          <TabPanels>
            <TabInformations event={event} />
            <TabCandidats
              candidates={event.candidates}
              eventName={event.name}
            />
            <TabParticipants
              participants={event.participants}
              eventName={event.name}
            />
          </TabPanels>
        </Tabs>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionEventItem;
