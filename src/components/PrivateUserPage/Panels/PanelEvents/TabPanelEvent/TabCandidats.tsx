import {
  Text,
  Box,
  TabPanel,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Avatar,
  Flex,
  Button,
  IconButton,
  Badge,
  Link,
  HStack,
} from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import Rating from "../../../../shared/Rating";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import ValidationBtn from "../../../../shared/ValidationBtn";
import { useContext } from "react";
import { Link as ReachLink } from "react-router-dom";
import { OrganizedEvent, useMyEvents } from "../../../MyEventsContextProvider";
import ScoreCandidat from "./ScoreCandidat";

interface Props {
  event: OrganizedEvent;
}

const TabCandidats = ({ event }: Props) => {
  const [events, isLoading, error, addNote, submitNewEvent, accept, refuse] =
    useMyEvents();
  const candidates = event.candidates;

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
            Candidates list for the event <strong>{event.name}</strong>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Avg Grade</Th>
              <Th>Bio</Th>
              <Th>Accept</Th>
              <Th>Reject</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map((candidat) => (
              <Tr key={candidat.id}>
                <Td>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={candidat.username}
                      src={candidat.picture}
                      size="sm"
                    />
                    <Box>
                      <Link as={ReachLink} to={`/users/${candidat.id}`}>
                        <Text size="sm">{candidat.username}</Text>
                      </Link>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <ScoreCandidat userId={candidat.id} />
                </Td>
                <Td>
                  <Text whiteSpace="normal" maxW="lg">
                    {candidat.bio}
                  </Text>
                </Td>
                <Td>
                  <ValidationBtn
                    isLoading={isLoading}
                    disabled={event.participants.length === event.participants_number}
                    colorScheme="green"
                    modalBtnValidateTxt="Accept"
                    modalBtnCancelTxt={"Cancel"}
                    modalHeader={
                      "Accept the candidate " + candidat.username + " ?"
                    }
                    modalTxt="This action is irreversible"
                    onValidate={() => accept(event.id, candidat.id)}
                    successToast={{
                      title: candidat.username + " accepted",
                      description: "bli bla blu",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    }}
                    failToast={{
                      title: "Error encountered",
                      description: "The applying did not worked",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    }}
                    onFinal={async function () { }}
                  >
                    <Text>Accept</Text>
                  </ValidationBtn>
                </Td>
                <Td>
                  <ValidationBtn
                    isLoading={isLoading}
                    colorScheme="red"
                    modalBtnValidateTxt="Reject"
                    modalBtnCancelTxt={"Cancel"}
                    modalHeader={
                      "Reject the candidate " + candidat.username + " ?"
                    }
                    modalTxt="This action is irreversible"
                    onValidate={() => refuse(event.id, candidat.id)}
                    successToast={{
                      title: candidat.username + " rejected",
                      description: "bli bla blu",
                      status: "warning",
                      duration: 3000,
                      isClosable: true,
                    }}
                    failToast={{
                      title: "Error encountered",
                      description: "The reject did not worked",
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    }}
                    onFinal={async function () {
                      //reloadEvents();
                    }}
                  >
                    <Text>Reject</Text>
                  </ValidationBtn>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
};

export default TabCandidats;
