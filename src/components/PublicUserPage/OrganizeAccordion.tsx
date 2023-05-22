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
import OrganizerNotesTable from "./OrganizerNotesTable";
import Rating from "../shared/Rating";
import OrganizerEventsTable from "./OrganizerEventsTable";

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
          <OrganizerNotesTable />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <AccordionHeader
              text={"Events"}
              badgeContent={<Text>7 events</Text>}
            />
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrganizerEventsTable />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OrganizeAccordion;
