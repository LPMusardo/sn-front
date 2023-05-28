import AddNote, { NoteFormData } from "../../../shared/AddNote";
import { useMyEvents } from "../../MyEventsContextProvider";

interface Props {
  eventId: number;
  targetId: number;
}

const AddNoteAsOrganizer = ({ eventId, targetId }: Props) => {
  const [events, isLoading, error, AddNoteFn] = useMyEvents();

  return (
    <AddNote
      onSubmit={(data: NoteFormData) => {
        AddNoteFn({ ...data, eventId, targetId });
      }}
    />
  );
};

export default AddNoteAsOrganizer;
