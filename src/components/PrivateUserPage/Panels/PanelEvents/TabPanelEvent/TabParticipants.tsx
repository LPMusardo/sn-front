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
import { Participant } from "../IEvent";
import AddNote from "./AddNote";

interface Props {
  participants: Participant[];
  eventName: string;
}

const TabParticipants = ({ participants, eventName }: Props) => {
  return (
    <TabPanel>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            participants list for the event <strong>{eventName}</strong>
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
            {participants.map((candidat) => (
              <Tr key={candidat.id}>
                <Td>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={candidat.username}
                      src={candidat.imageURL}
                      size="sm"
                    />
                    <Box>
                      <Link as={ReachLink} to="/users/id">
                        <Text size="sm">{candidat.username}</Text>
                      </Link>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Rating score={candidat.note} total={5} spacing={0.5} />
                </Td>
                <Td>
                  <Text whiteSpace="normal" maxW="lg">
                    {candidat.bio}
                  </Text>
                </Td>
                <Td>
                  <AddNote/>
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
