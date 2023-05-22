
export interface Candidat {
    id : number
    username : string,
    imageURL : string,
    bio : string,
    note : number
}

export interface Participant {
    id : number
    username : string,
    imageURL : string,
    bio : string,
    note : number
}

export default interface IEvent {
    id: number;
    name: string;
    number: number;
    size: number;
    mainCategory: string;
    category: string;
    creationDate: string;
    description: string;
    imageURL: string;
    date: string;
    address: string;
    candidates : Candidat[]
    participants : Participant[]
  }
  