import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { CountResult, MessageSummary } from "../types/Count";
import MouseOverPopover from "./MouseOverPopover";

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
              <TableCell component="th">
                <MouseOverPopover
                  label={`${channel.messages.length}回`}
                  content={
                    <Typography sx={{ p: 1 }}>
                      {channel.messages.length === 0
                        ? "None"
                        : channel.messages.map(
                            (message: MessageSummary, index) => (
                              <React.Fragment key={index}>
                                {message.date} {message.text}
                                {index !== channel.messages.length - 1 && (
                                  <br />
                                )}
                              </React.Fragment>
                            )
                          )}
                    </Typography>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
