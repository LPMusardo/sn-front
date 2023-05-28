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
import ParticipantNotesTable from "./ParticipantNotesTable";
import Rating from "../shared/Rating";
import { IUserData } from "../../models/IUserData";

interface IOrganizeAccordionProps {
  user:IUserData;
}


const OrganizeAccordion: React.FC<IOrganizeAccordionProps> = ({ user }) => {

  let averageNoteAsParticipant = -1;
  let nbNotesAsParticipant = 0;
  if (user.receivedNotes) {

    const sumNoteAsParticipant = user.receivedNotes.reduce((acc, obj) => {
      if (obj.type == "1") {
        nbNotesAsParticipant++;
        return acc + parseInt(obj.value, 10);
      } else {
        return acc;
      }
    }, 0);
    if (nbNotesAsParticipant != 0)
      averageNoteAsParticipant = sumNoteAsParticipant / nbNotesAsParticipant;
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
                  <Rating score={averageNoteAsParticipant} total={5} spacing={1} />
                </Box>
              }
            />
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ParticipantNotesTable user={user}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OrganizeAccordion;
