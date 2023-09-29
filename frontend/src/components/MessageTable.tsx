import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { Message } from "../types/Message";
import ReminderDialog from "./ReminderDialog";
import { Member } from "../types/Member";
import MouseOverPopover from "./MouseOverPopover";

export default function MessageTable({
  token,
  channelId,
  members,
  messages,
}: {
  token: string;
  channelId: string;
  members: Member[];
  messages: Message[];
}) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", m: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>送信者</TableCell>
            <TableCell>メッセージ</TableCell>
            <TableCell>リアクション</TableCell>
            <TableCell>返信</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages?.map((message) => {
            const reactionMentionMembers = members.filter(
              (member) =>
                !message.reactors.some((reactor) => reactor.id === member.id) &&
                !(message.sender.id === member.id)
            );
            const replyMentionMembers = members.filter(
              (member) =>
                !message.replyUsers.some(
                  (replyUser) => replyUser.id === member.id
                ) && !(message.sender.id === member.id)
            );
            return (
              <TableRow
                key={message.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th">{message.date}</TableCell>
                <TableCell component="th">{message.sender.name}</TableCell>
                <TableCell component="th">{message.text}</TableCell>
                <TableCell component="th">
                  <MouseOverPopover
                    label={`${message.reactors.length}人/${members.length}人`}
                    content={
                      <Typography sx={{ p: 1 }}>
                        {message.reactors.length === 0
                          ? "None"
                          : message.reactors.map((member, index) => (
                              <React.Fragment key={index}>
                                {member.name}
                                {index !== members.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                      </Typography>
                    }
                  />
                  <ReminderDialog
                    token={token}
                    channelId={channelId}
                    mentionMembers={reactionMentionMembers}
                    message={message}
                  />
                </TableCell>
                <TableCell component="th">
                  <MouseOverPopover
                    label={`${message.replyUsers.length}人/${members.length}人`}
                    content={
                      <Typography sx={{ p: 1 }}>
                        {message.replyUsers.length === 0
                          ? "None"
                          : message.replyUsers.map((member, index) => (
                              <React.Fragment key={index}>
                                {member.name}
                                {index !== members.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                      </Typography>
                    }
                  />
                  <ReminderDialog
                    token={token}
                    channelId={channelId}
                    mentionMembers={replyMentionMembers}
                    message={message}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
