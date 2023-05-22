import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import OrganizeAccordion from "./OrganizeAccordion";
import ParticipantAccordion from "./ParticipantAccordion";

const RightPanel = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Organizer</Tab>
        <Tab>Participant</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <OrganizeAccordion />
        </TabPanel>
        <TabPanel>
          <ParticipantAccordion/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RightPanel;
