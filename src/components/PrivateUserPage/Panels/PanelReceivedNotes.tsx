import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Flex,
  Avatar,
  Box,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import NotesTable from "../../shared/NotesTable";
import { useMyReceivedNotes } from "../MyReceivedNotesContextProvider";
import { useLogin } from "../../LoginContextProvider";
import { useEffect } from "react";

const PanelReceivedNotes = () => {
  const [
    get_reveived_notes_as_organiser,
    get_reveived_notes_as_participant,
    isLoading,
    error,
  ] = useMyReceivedNotes();
  const headers = ["Notes", "From", "Comment", "Event", "Posted"];

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();
  const user = getUserData();

  //----------------------------- Error Toast -----------------------------
  const toast = useToast()
  useEffect(() => {
    if (error) {
      toast.closeAll();
      toast({
        title: 'Error Encountered',
        description: error,
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [error])

  return (
    <>
      {/* <Heading size="md" color="red">{error}</Heading> */}
      {isLoading && <Spinner />}
      <Tabs px="10">
        <TabList>
          <Tab>As Organizer</Tab>
          <Tab>As Participant</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>

            <NotesTable
              headers={headers}
              notes={get_reveived_notes_as_organiser()}
              caption={user && `Notes received by ${user.username} as organizer`}
            />
          </TabPanel>
          <TabPanel>
            <NotesTable
              headers={headers}
              notes={get_reveived_notes_as_participant()}
              caption={user && `Notes received by ${user.username} as participant`}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default PanelReceivedNotes;
