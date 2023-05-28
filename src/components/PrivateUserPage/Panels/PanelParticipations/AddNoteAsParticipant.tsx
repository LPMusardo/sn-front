import AddNote, { NoteFormData } from "../../../shared/AddNote";
import { useMyEvents } from "../../MyEventsContextProvider";
import { useMyParticipations } from "../../MyParticipationsContextProvider";

interface Props {
  eventId: number;
}

const AddNoteAsParticipant = ({ eventId }: Props) => {
  const [events, isLoading, error, cancelParticipation, AddNoteFn] =
    useMyParticipations();

  return (
    <AddNote
      onSubmit={(data: NoteFormData) => {
        AddNoteFn({ ...data, eventId });
      }}
    />
  );
};

export default AddNoteAsParticipant;
