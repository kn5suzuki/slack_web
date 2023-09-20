import { Member } from "./Member";

export type RawMessage = {
  ts: string;
  text: string;
  senderId: string;
  reactorIds: string[];
  replyUserIds: string[];
};

export type Message = {
  id: string;
  text: string;
  sender: Member;
  date: string;
  reactors: Member[];
  replyUsers: Member[];
};
