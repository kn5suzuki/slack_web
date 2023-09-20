import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import {
  IconButton,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Member } from "../types/Member";
import MemberList from "./MemberList";
import MessageTable from "./MessageTable";
import { Message, RawMessage } from "../types/Message";

function decodeTimestamp(timestamp: string): string {
  // Split the timestamp into seconds and fractions of a second
  const [seconds] = timestamp.split(".").map(Number);

  // Convert the seconds to milliseconds
  const date = new Date(seconds * 1000);

  // You can now format the date using any method you like
  // Here, we use toLocaleString(), but you could also use Intl.DateTimeFormat or any library like moment.js
  return date.toLocaleString();
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChannelDetail({
  token,
  channelId,
  channelName,
}: {
  token: string;
  channelId: string;
  channelName: string;
}) {
  const [open, setOpen] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sentQuery, setSentQuery] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const resetState = () => {
    setQuery("");
    setMessage("");
    setMembers([]);
  };

  const handleClickOpen = () => {
    resetState();
    setOpen(true);
    const url = new URL(import.meta.env.BaseUrl + "/members");
    url.searchParams.append("channel_id", channelId);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res: ", res);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setMembers(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  const handleSendMessage = async () => {};
  const handleSearchMessage = async () => {
    const url = new URL(import.meta.env.BaseUrl + "/messages");
    url.searchParams.append("channel_id", channelId);
    url.searchParams.append("query", query);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res: ", res);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data: RawMessage[]) => {
        console.log("data: ", data);
        const formattedData: Message[] = data.map((rawMessage) => ({
          id: rawMessage.ts,
          date: decodeTimestamp(rawMessage.ts),
          sender: members.find(
            (member) => member.id === rawMessage.senderId
          ) || { id: "", name: "" },
          text: rawMessage.text,
          reactors: rawMessage.reactorIds
            .map((reactorId) =>
              members.find((member) => member.id === reactorId)
            )
            .filter((member): member is Member => member !== undefined),
          replyUsers: rawMessage.replyUserIds
            .map((replyId) => members.find((member) => member.id === replyId))
            .filter((member): member is Member => member !== undefined),
        }));
        console.log("formattedData: ", formattedData);
        setMessages(formattedData);
        setSentQuery(true);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Detail
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {channelName}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <MemberList members={members} />
          </ListItem>
          <ListItem>
            <TextField
              autoFocus
              margin="normal"
              id="message"
              label="Message"
              fullWidth
              multiline
              // rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <TextField
              autoFocus
              margin="normal"
              id="query"
              label="Query"
              fullWidth
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSearchMessage}
            >
              Search
            </Button>
          </ListItem>
          <ListItem>
            {sentQuery && (
              <MessageTable
                token={token}
                channelId={channelId}
                members={members}
                messages={messages}
              />
            )}
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
