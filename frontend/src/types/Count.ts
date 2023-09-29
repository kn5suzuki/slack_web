export type CountData = {
  ts: string;
  text: string;
  senderId: string;
};

export type CountResult = {
  id: string;
  name: string;
  messages: MessageSummary[];
};

export type MessageSummary = {
  date: string;
  text: string;
};
