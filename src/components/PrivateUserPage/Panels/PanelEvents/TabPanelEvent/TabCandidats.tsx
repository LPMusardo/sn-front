import {
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  VStack,
  Image,
  Square,
  Link,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Heading,
  useColorModeValue,
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
} from "@chakra-ui/react";
import { Candidat } from "../IEvent";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
import { FiMapPin } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import Rating from "../../../../shared/Rating";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import ValidationBtn from "../../../../shared/ValidationBtn";
import { useContext } from "react";
import { MyEventsContext } from "../../../MyEventsContextProvider";
import { Link as ReachLink } from "react-router-dom"


interface Props {
  candidates: Candidat[];
  eventName: string;
  // onAccept: (id:number)=>void
  // onReject: (id:number)=>void
}

async function sleep() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("5 seconds have passed.");
}

const TabCandidats = ({ candidates, eventName }: Props) => {
  const [events, reloadEvents] = useContext(MyEventsContext);

  return (
    <TabPanel>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            Candidates list for the event <strong>{eventName}</strong>
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
                  <ValidationBtn
                    colorScheme="green"
                    modalBtnValidateTxt="Accept"
                    modalBtnCancelTxt={"Cancel"}
                    modalHeader={
                      "Accept the candidate " + candidat.username + " ?"
                    }
                    modalTxt="This action is irreversible"
                    onValidate={async function () {
                      return sleep();
                    }}
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
                    onFinal={async function () {
                      reloadEvents();
                    }}
                  >
                    <Text>Accept</Text>
                  </ValidationBtn>
                </Td>
                <Td>
                  <ValidationBtn
                    colorScheme="red"
                    modalBtnValidateTxt="Reject"
                    modalBtnCancelTxt={"Cancel"}
                    modalHeader={
                      "Reject the candidate " + candidat.username + " ?"
                    }
                    modalTxt="This action is irreversible"
                    onValidate={async function () {
                      return sleep();
                    }}
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
                      reloadEvents();
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
