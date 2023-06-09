import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { OrganizedEvent } from "../../MyEventsContextProvider";
import TabCandidats from "./TabPanelEvent/TabCandidats";
import TabInformations from "./TabPanelEvent/TabInformations";
import TabParticipants from "./TabPanelEvent/TabParticipants";

interface Props {
  event: OrganizedEvent;
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
              event={event}
            />
            <TabParticipants
              event={event}
            />
          </TabPanels>
        </Tabs>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionEventItem;
