import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Member } from "../types/Member";
import { Message } from "../types/Message";
import { TextField } from "@mui/material";

export default function Reminder({
  token,
  channelId,
  members,
  message,
}: {
  token: string;
  channelId: string;
  members: Member[];
  message: Message;
}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [reminderMessage, setReminderMessage] = React.useState("");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReactionReminder = () => {
    const mentionMembers = members.filter(
      (member) =>
        !message.reactors.some((reactor) => reactor.id === member.id) &&
        !(message.sender.id === member.id)
    );
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "reply");
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel_id: channelId,
        ts: message.id,
        message: reminderMessage,
        mention_names: mentionMembers.map((member) => member.name),
      }),
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
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
    setOpen(false);
  };

  const handleReplyReminder = () => {
    const mentionMembers = members.filter(
      (member) =>
        !message.replyUsers.some((replyUser) => replyUser.id === member.id) &&
        !(message.sender.id === member.id)
    );
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "reply");
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel_id: channelId,
        ts: message.id,
        message: reminderMessage,
        mention_names: mentionMembers.map((member) => member.name),
      }),
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
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>Reminder</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          このメッセージにリマインドしますか？
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {message.text}
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="message"
            label="Message"
            fullWidth
            multiline
            // rows={4}
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleReactionReminder}>Remind Reaction</Button>
          <Button onClick={handleReplyReminder}>Remind Reply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
