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
  Box,
  Link,
} from "@chakra-ui/react";
import NoteCard from "../shared/NoteCard";
import Comment from "../shared/Comment";
import Rating from "../shared/Rating";
import { Link as ReachLink } from "react-router-dom";
import { useLogin } from "../LoginContextProvider";

interface Note {
  id: number;
  creationDate: string;
  title: string;
  comment: string | null;
  value: number;
  type: number;
  ownerId: number;
  targetId: number;
  eventId: number;
  owner: User;
  target?: User;
  event: Event;
}
interface User {
  id: number;
  username: string;
  email: string;
  creation_date: string;
  picture: string | null;
  bio: string | null;
}
interface Event {
  id: number;
  participants_number: number;
  category: string;
  description: string;
  image_url: string;
  name: string;
  date: string;
  creation_date: string;
  organizerId: number;
  MainCategoryId: number;
  AddressId: number;
}

interface Props {
  headers: string[];
  notes: Note[];
  caption?: any;
}

function NotesTable({ headers, notes, caption }: Props) {
  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>{caption}</TableCaption>
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th key={header}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {notes.map((note) => (
              <Tr key={note.id}>
                <Td>
                  <Rating score={note.value} total={5} spacing={1} />
                </Td>
                <Td>
                  {note.owner && (
                    <Link as={ReachLink} to={`/users/${note.owner.id}`}>
                      <NoteCard
                        username={note.owner.username}
                        pictureUrl={note.owner.picture || ""}
                        id={ `${note.owner.id}`}
                      />
                    </Link>
                  )}
                  {note.target && (
                    <Link as={ReachLink} to={`/users/${note.target.id}`}>
                      <NoteCard
                        username={note.target.username}
                        pictureUrl={note.target.picture || ""}
                        id={ `${note.owner.id}`}

                      />
                    </Link>
                  )}
                </Td>
                <Td>
                  <Comment title={note.title} comment={note.comment || ""} />
                </Td>
                <Link as={ReachLink} to={`/events/${note.event.id}`}>
                  <Td>{note.event.name}</Td>
                </Link>
                <Td>
                  {new Date(note.creationDate).toLocaleDateString() +
                    " " +
                    new Date(note.creationDate).toLocaleTimeString()}
                </Td>
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
    </Box>
  );
}

export default NotesTable;
