import {
  Avatar,
  Badge,
  Box,
  Flex,
  HStack,
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
import { RiGroupLine } from "react-icons/ri";
import { Link as ReachLink } from "react-router-dom";
import { OrganizedEvent } from "../../../MyEventsContextProvider";
import AddNoteAsOrganizer from "../AddNoteAsOrganizer";
import ScoreCandidat from "./ScoreCandidat";

interface Props {
  event: OrganizedEvent;
}

const TabParticipants = ({ event }: Props) => {

  const participants = event.participants;

  return (
    <TabPanel>
      <Badge variant="subtle" colorScheme={event.participants.length === event.participants_number ? "red" : "yellow"} m="10px" ml="15px" p="4px">
        <HStack>
          <RiGroupLine />
          <Text>{`${event.participants.length} / ${event.participants_number}`}</Text>
        </HStack>
      </Badge>
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
                  <ScoreCandidat userId={participant.id} />
                </Td>
                <Td>
                  <Text whiteSpace="normal" maxW="lg">
                    {participant.bio}
                  </Text>
                </Td>
                <Td>
                  <AddNoteAsOrganizer eventId={event.id} targetId={participant.id} />
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
