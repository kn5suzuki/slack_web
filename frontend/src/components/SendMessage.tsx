import { Box, TextField } from "@mui/material";
import { useState } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import { StyledButton } from "./StyledButton";

export default function SendMessage({
  token,
  channelId,
}: {
  token: string;
  channelId: string;
}) {
  const [text, setText] = useState<string>("");

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // apiClient.postMessageChannelsPost(`Bearer ${token}`, {
    //   channel_id: channelId,
    //   text: text,
    // });
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/channels");
    const data = await fetchWrapper<string>(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel_id: channelId,
        text: text,
      }),
    });
    if (data) {
      alert("メッセージを送信しました");
      setText("");
    }
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
      <StyledButton type="submit" variant="contained" sx={{ width: 150 }}>
        送信
      </StyledButton>
    </Box>
  );
}
