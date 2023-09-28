import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";

import ChannelDetail from "./ChannelDetail";
import { Channel } from "../types/Channel";

export default function ChannelTable({
  token,
  channels,
}: {
  token: string;
  channels: Channel[];
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: 5, width: "80%", maxWidth: 1000 }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ typography: "body1" }}>チャンネル名</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {channels?.map((channel) => (
            <TableRow
              key={channel.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">{channel.name}</TableCell>
              <TableCell align="right">
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                  <ChannelDetail
                    token={token}
                    channelId={channel.id}
                    channelName={channel.name}
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
