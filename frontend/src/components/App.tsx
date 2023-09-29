import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import ChannelTable from "./ChannelTable";
import { Channel } from "../types/Channel";
import fetchWrapper from "../utils/fetchWrapper";
import CircularIndeterminate from "./CircularIndeterminate";

function App() {
  const [token, setToken] = useState<string>("");
  const [submittedToken, setSubmittedToken] = useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedToken(false);
    setLoading(true);
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "channels");
    const data = await fetchWrapper<Channel[]>(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data) {
      setChannels(data);
      setSubmittedToken(true);
    }
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      marginTop={10}
    >
      <Box
        display="flex"
        flexDirection="row"
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "80%", maxWidth: 800 }}
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

        <Button type="submit" fullWidth variant="contained" sx={{ width: 200 }}>
          Set Token
        </Button>
      </Box>

      {loading && <CircularIndeterminate />}
      {submittedToken && <ChannelTable token={token} channels={channels} />}
    </Box>
  );
}

export default App;
