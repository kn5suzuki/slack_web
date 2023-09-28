import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function SendMessage({
  token,
  channelId,
}: {
  token: string;
  channelId: string;
}) {
  const [text, setText] = useState<string>("");

  const handleSendMessage = async () => {
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "members");
    url.searchParams.append("channel_id", channelId);
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
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
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSendMessage}
    >
      <TextField
        variant="outlined"
        fullWidth
        multiline
        margin="normal"
        id="message"
        label="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ width: 150 }}>
        Send
      </Button>
    </Box>
  );
}
