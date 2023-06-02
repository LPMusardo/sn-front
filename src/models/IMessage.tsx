export interface IMessage {
  content: string;
  creationDate: string;
  owner:{
    username: string;
    picture: string;
  }
  userId: string;
  id: string;

  
}