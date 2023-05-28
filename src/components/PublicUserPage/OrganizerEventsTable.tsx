import {
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Table,
} from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import Comment from "./Comment";
import Rating from "../shared/Rating";
import { IUserData } from "../../models/IUserData";

interface OrganizerEventsTableProps {
  user:IUserData;
}

// function to calculate the average score of the events with an eventId given
function calculateAverageScore(eventId: string, user: IUserData) {
  let average = -1;
  let sum = 0;
  let count = 0;
  user.receivedNotes.forEach((note) => {
    if (note.event.id === eventId) {
      sum += parseInt(note.value, 10);
      count++;
    }
  });
  if (count > 0) {
    average = sum / count;
  }
  return average;
}

function OrganizerEventsTable( {user}: OrganizerEventsTableProps ) {
  const headers = ["Notes", "Event", "Date"];

  


  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Events organized by {user?.username}</TableCaption>
        <Thead>
          <Tr>
            {headers.map((headers) => (
              <Th>{headers}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {user?.organizedEvents?.map((events) => (
            <Tr>
              <Td>
                <Rating score={calculateAverageScore(events.id,user) ?? ""} total={5} spacing={1} />
              </Td>
              <Td>{events?.name}</Td>
              <Td>{events?.date}</Td>
            </Tr>
          )) ?? "No events organized"}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th >multiply by</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  );
}

export default OrganizerEventsTable;
