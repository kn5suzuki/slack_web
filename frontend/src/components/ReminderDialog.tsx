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
import fetchWrapper from "../utils/fetchWrapper";

export default function ReminderDialog({
  token,
  channelId,
  mentionMembers,
  message,
}: {
  token: string;
  channelId: string;
  mentionMembers: Member[];
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

  const handleReminder = async () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/reply");
    const data = await fetchWrapper<string>(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel_id: channelId,
        ts: message.id,
        message: reminderMessage,
        mention_ids: mentionMembers.map((member) => member.id),
      }),
    });
    if (data) {
      alert("リマインドしました");
      setOpen(false);
    }
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
          以下のメンバーにリマインドします
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {mentionMembers.map((member, index) => (
              <React.Fragment key={index}>
                {member.name}
                {index !== mentionMembers.length - 1 && <br />}
              </React.Fragment>
            ))}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            multiline
            margin="normal"
            id="message"
            label="Message"
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleReminder}>Remind</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
