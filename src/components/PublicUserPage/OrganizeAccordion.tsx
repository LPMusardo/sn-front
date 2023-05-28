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
import { IUserData } from "../../models/IUserData";

interface IOrganizeAccordionProps {
  user: IUserData;
}

const OrganizeAccordion: React.FC<IOrganizeAccordionProps> = ({ user }) => {
  let averageNoteAsOrganizer = -1
  let averageNoteAsParticipant = -1
  let nbNotesAsOrganizer = 0;
  if(user.receivedNotes){
    const sumNoteAsOrganizer = user.receivedNotes.reduce((acc, obj) => {
      if (obj.type == "0") {
        nbNotesAsOrganizer++;
        return acc + parseInt(obj.value, 10);
      } else {
        return acc;
      }
    }, 0);
    averageNoteAsOrganizer = sumNoteAsOrganizer / nbNotesAsOrganizer;
    const sumNoteAsParticipant = user.receivedNotes.reduce((acc, obj) => {
      if (obj.type == "1") {
        nbNotesAsOrganizer++;
        return acc + parseInt(obj.value, 10);
      } else {
        return acc;
      }
    }, 0);
    averageNoteAsParticipant = sumNoteAsParticipant / nbNotesAsOrganizer;
  }
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <AccordionHeader
              text={"Notes"}
              badgeContent={
                <Box padding={0.5}>
                  <Rating score={averageNoteAsOrganizer} total={5} spacing={1} />
                </Box>
              }
            />
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrganizerNotesTable user={user} />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <AccordionHeader
              text={"Events"}
              badgeContent={<Text>{user?.organizedEvents?.length ?? "no "} events</Text>}
            />
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrganizerEventsTable user={user}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OrganizeAccordion;
