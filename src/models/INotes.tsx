export interface INotes {
  comment: string;
  event: { id: string; name: string };
  creationDate: string;
  owner: { id: string; username: string; picture: string };
  value: string;
  title: string;
  type: string;
}
