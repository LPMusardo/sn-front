import {
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import MyGivenNotesContextProvider, {
  useMyGivenNotes,
} from "../MyGivenNotesContextProvider";
import NotesTable from "../../shared/NotesTable";
import { useLogin } from "../../LoginContextProvider";
import PanelGivenNotesContent from "./PanelGivenContent";

const PanelGivenNotes = () => {
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

  return (
    <MyGivenNotesContextProvider>
      <PanelGivenNotesContent />
    </MyGivenNotesContextProvider>
  );
};

export default PanelGivenNotes;
