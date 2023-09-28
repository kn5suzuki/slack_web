import { Member } from "../types/Member";
import { Message, RawMessage } from "../types/Message";
import decodeTimestamp from "./decodeTimestamp";

export default function rawMessagesToMessages(
  rawMessages: RawMessage[],
  members: Member[]
): Message[] {
  return rawMessages.map((rawMessage) => ({
    id: rawMessage.ts,
    date: decodeTimestamp(rawMessage.ts),
    sender: members.find((member) => member.id === rawMessage.senderId) || {
      id: "",
      name: "",
    },
    text: rawMessage.text,
    reactors: rawMessage.reactorIds
      .map((reactorId) => members.find((member) => member.id === reactorId))
      .filter((member): member is Member => member !== undefined),
    replyUsers: rawMessage.replyUserIds
      .map((replyId) => members.find((member) => member.id === replyId))
      .filter((member): member is Member => member !== undefined),
  }));
}
