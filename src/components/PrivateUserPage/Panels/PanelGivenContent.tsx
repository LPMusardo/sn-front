import {
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import MyGivenNotesContextProvider, {
  useMyGivenNotes,
} from "../MyGivenNotesContextProvider";
import NotesTable from "../../shared/NotesTable";
import { useLogin } from "../../LoginContextProvider";
import { useEffect } from "react";

const PanelGivenNotesContent = () => {
  const [
    get_given_notes_as_organiser,
    get_given_notes_as_participant,
    isLoading,
    error,
    givenNotes,
  ] = useMyGivenNotes();

  const [isLogged, isL, e, login, logout, getUserData] = useLogin();
  const user = getUserData();

  const headers = ["Notes", "To", "Comment", "Event", "Posted"];


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
      {/* <Heading size="md" color="red">
        {error}
      </Heading> */}
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
              notes={get_given_notes_as_organiser()}
              caption={user && `Notes given by ${user.username} as organizer`}
            />
          </TabPanel>
          <TabPanel>
            <NotesTable
              headers={headers}
              notes={get_given_notes_as_participant()}
              caption={user && `Notes given by ${user.username} as participant`}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default PanelGivenNotesContent;
