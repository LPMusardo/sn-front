export interface IEventData {
  Address: {
    id: string;
    street: string;
    city: string;
    country: string;
    zip: string;
  };
  AddressId: string;
  MainCategory: {
    id: string;
    name: string;
  };
  creation_date: string;
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  participants_number: string;
  date: string;
  organizerId: string;
  organizer: {
    id: string;
    username: string;
  };

  score_avg: {
    notes: Array<{
      comment: string;
      eventId: string;
      id: string;
      ownerId: string;
      targetId: string;
      title: string;
      type: string;
      value: string;
    }>;
    score_avg: string;
  };
  participants: Array<{
    nb_places_taken: string;
  }>;
}
