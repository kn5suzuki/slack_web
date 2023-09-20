import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import ChannelTable from "./ChannelTable";
import { Channel } from "../types/Channel";

function App() {
  const [token, setToken] = useState<string>("");
  const [submittedToken, setSubmittedToken] = useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "channels");
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
        setChannels(data);
        setSubmittedToken(true);
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
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="row"
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <TextField
          required
          fullWidth
          name="token"
          label="Token"
          type="password"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <Button type="submit" fullWidth variant="contained">
          Set Token
        </Button>
      </Box>
      {submittedToken && <ChannelTable token={token} channels={channels} />}
    </Box>
  );
}

export default App;
