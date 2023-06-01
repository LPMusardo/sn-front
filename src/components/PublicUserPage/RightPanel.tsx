import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import OrganizeAccordion from "./OrganizeAccordion";
import ParticipantAccordion from "./ParticipantAccordion";
import { IUserData } from "../../models/IUserData";

interface IRightPanelProps {
  user: IUserData;
}

const RightPanel: React.FC<IRightPanelProps> = ({ user }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Organizer</Tab>
        <Tab>Participant</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <OrganizeAccordion user={user} />
        </TabPanel>
        <TabPanel>
          <ParticipantAccordion user={user} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RightPanel;
