import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import AccordionHeader from "./AccordionHeader";
import OrganizerEventsTable from "./OrganizerEventsTable";
import ParticipantNotesTable from "./ParticipantNotesTable";
import Rating from "../shared/Rating";

const OrganizeAccordion = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <AccordionHeader
              text={"Notes"}
              badgeContent={
                <Box padding={0.5}>
                  <Rating score={3} total={5} spacing={1} />
                </Box>
              }
            />
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ParticipantNotesTable />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OrganizeAccordion;
