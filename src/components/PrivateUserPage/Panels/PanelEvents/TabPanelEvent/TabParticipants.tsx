import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  TabPanel,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import Rating from "../../../../shared/Rating";
import AddNote from "../../../../shared/AddNote";
import { OrganizedEvent } from "../../../MyEventsContextProvider";
import AddNoteAsOrganizer from "../AddNoteAsOrganizer";

interface Props {
  event: OrganizedEvent;
}

const TabParticipants = ({ event }: Props) => {

  const participants = event.participants;

  return (
    <TabPanel>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            participants list for the event <strong>{event.name}</strong>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Avg Grade</Th>
              <Th>Bio</Th>
              <Th>Grade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participants.map((participant) => (
              <Tr key={participant.id}>
                <Td>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={participant.username}
                      src={participant.picture}
                      size="sm"
                    />
                    <Box>
                      <Link as={ReachLink} to={`/users/${participant.id}`}>
                        <Text size="sm">{participant.username}</Text>
                      </Link>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Rating score={0} total={5} spacing={0.5} />?
                </Td>
                <Td>
                  <Text whiteSpace="normal" maxW="lg">
                    {participant.bio}
                  </Text>
                </Td>
                <Td>
                  <AddNoteAsOrganizer eventId={event.id} targetId={participant.id}/>
                  {/* <Button>Rate (check pas deja fait)</Button> */}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
};

export default TabParticipants;
