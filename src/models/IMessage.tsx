export interface IMessage {
  content: string;
  creationDate: string;
  owner:{
    username: string;
    image_url: string;
  }
  userId: string;
  id: string;

  
}