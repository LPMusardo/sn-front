import {
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
} from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import Comment from "./Comment";
import Rating from "../shared/Rating";

interface Note {
  score: number;
  username: string;
  pictureUrl: string;
  title: string;
  comment: string;
  eventName: string;
  creationDate: string;
}

function ParticipantNotesTable() {
  const headers = ["Notes", "From", "Comment", "Event", "Posted"];
  const notes: Note[] = [
    {
      score: 4,
      username: "Damien",
      pictureUrl:
        "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      title: "très bien",
      comment: "un Super momment au karting",
      eventName: "Karting au castellet",
      creationDate: "12/12/22",
    },
    {
      score: 2,
      username: "Heba",
      pictureUrl: "",
      title: "Nul",
      comment: "L'hote était désagréable",
      eventName: "Karting au castellet",
      creationDate: "12/12/22",
    },
  ];

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          Notes received by Charles as an event participant
        </TableCaption>
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
              <Td>
                <NoteCard
                  username={note.username}
                  pictureUrl={note.pictureUrl}
                />
              </Td>
              <Td>
                <Comment title={note.title} comment={note.comment} />
              </Td>
              <Td>{note.eventName}</Td>
              <Td>{note.creationDate}</Td>
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

export default ParticipantNotesTable;
