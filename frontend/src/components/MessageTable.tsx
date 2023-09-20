import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";

import { Message } from "../types/Message";
import Reminder from "./Reminder";
import { Member } from "../types/Member";

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
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages?.map((message) => (
            <TableRow
              key={message.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">{message.date}</TableCell>
              <TableCell component="th">{message.sender.name}</TableCell>
              <TableCell component="th">{message.text}</TableCell>
              <TableCell component="th">
                {message.reactors.map((reactor) => reactor.name)}
              </TableCell>
              <TableCell component="th">
                {message.replyUsers.map((reply) => reply.name)}
              </TableCell>
              <TableCell align="right">
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                  <Reminder
                    token={token}
                    channelId={channelId}
                    members={members}
                    message={message}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
