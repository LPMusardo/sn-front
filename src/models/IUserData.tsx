import { IEventData } from "./IEventData";
import { INotes } from "./INotes";

export interface IUserData {
  id: string;
  username: string;
  email: string;
  picture: string;
  bio: string;
  creation_date: string;
  receivedNotes: Array<INotes>;
  organizedEvents: Array<IEventData>;
  participantEvents: Array<IEventData>;
}
