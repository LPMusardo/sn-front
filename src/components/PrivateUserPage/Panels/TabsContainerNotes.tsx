import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Flex,
  Avatar,
  Box,
  Heading,
} from "@chakra-ui/react";


const PanelReceivedNotes = () => {
  return (
    <Tabs px="10">
      <TabList>
        <Tab>Organizer</Tab>
        <Tab>Participant</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* <OrganizeAccordion /> */}
        </TabPanel>
        <TabPanel>
          {/* <ParticipantAccordion /> */}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default PanelReceivedNotes;
