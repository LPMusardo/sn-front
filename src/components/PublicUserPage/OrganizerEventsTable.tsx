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
import NoteCard from "../shared/NoteCard";
import Comment from "../shared/Comment";
import Rating from "../shared/Rating";

interface Event {
  score: number;
  eventName: string;
  date: string;
}

function OrganizerEventsTable() {
  const headers = ["Notes", "Event", "Date"];
  const notes: Event[] = [
    {
      score: 3,
      eventName: "Concert Jazz Convergence",
      date: "07/06/23",
    },
    {
      score: 3,
      eventName: "Cinema: As Bestas",
      date: "27/02/23",
    },
  ];

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Events organized by Charles</TableCaption>
        <Thead>
          <Tr>
            {headers.map((headers) => (
              <Th>{headers}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {notes.map((note) => (
            <Tr>
              <Td>
                <Rating score={note.score} total={5} spacing={1} />
              </Td>
              <Td>{note.eventName}</Td>
              <Td>{note.date}</Td>
            </Tr>
          ))}
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
