import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { CountResult } from "../types/Count";

export default function CountResultTable({
  result,
}: {
  result: CountResult[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ typography: "body1" }}>名前</TableCell>
            <TableCell sx={{ typography: "body1" }}>回数</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((channel) => (
            <TableRow
              key={channel.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th">{channel.name}</TableCell>
              <TableCell component="th">{channel.messages.length}回</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
