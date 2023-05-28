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
import { IUserData } from "../../models/IUserData";
import { Link } from "react-router-dom";

interface OrganizerNotesTableProps {
  user: IUserData;
}

function OrganizerNotesTable({ user }: OrganizerNotesTableProps) {
  const headers = ["Notes", "From", "Comment", "Event", "Posted"];

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          Notes received by {user.username} as an event organizer
        </TableCaption>
        <Thead>
          <Tr>
            {headers.map((headers) => (
              <Th>{headers}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {user?.receivedNotes
            ?.filter((note) => note.type == "0")
            .map((note, index) => (
              <Tr key={index}>
                <Td>
                  <Rating
                    score={parseInt(note.value, 10)}
                    total={5}
                    spacing={1}
                  />
                </Td>
                <Td>
                  <NoteCard
                    username={note.owner.username}
                    pictureUrl={note.owner.picture}
                    id={note.owner.id}
                  />
                </Td>
                <Td>
                  <Comment title={note.title} comment={note.comment} />
                </Td>

                <Td>
                  <Link style={{ color: "#B195EE" }} to={"/events/" + note.event.id}>
                    {note?.event.name}
                  </Link>
                  
                  </Td>
                <Td>{new Date(note.creationDate).toLocaleDateString()}</Td>
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

export default OrganizerNotesTable;
