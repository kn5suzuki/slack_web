import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  IconButton,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Member } from "../types/Member";
import MemberList from "./MemberList";
import fetchWrapper from "../utils/fetchWrapper";
import ChannelOperations from "./ChannelOperations";

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

  const resetState = () => {
    setMembers([]);
  };

  const handleClickOpen = async () => {
    resetState();
    setOpen(true);
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/members");
    url.searchParams.append("channel_id", channelId);
    const data = await fetchWrapper<Member[]>(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data) {
      setMembers(data);
    }
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Detail
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", alignItems: "center" }}>
          <Toolbar sx={{ width: "80%" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {channelName}
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <MemberList members={members} />
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          marginTop={10}
        >
          <ChannelOperations
            token={token}
            channelId={channelId}
            members={members}
          />
        </Box>
      </Dialog>
    </>
  );
}
