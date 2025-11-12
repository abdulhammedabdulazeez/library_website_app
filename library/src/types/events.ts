export type EventSpeaker = {
  name: string;
  title: string;
};

export type LibraryEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  registrationUrl?: string;
  speakers?: EventSpeaker[];
};

