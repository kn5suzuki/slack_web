import { useState } from "react";
import { Box, TextField, styled } from "@mui/material";
import ChannelTable from "./ChannelTable";
import { Channel } from "../types/Channel";
import fetchWrapper from "../utils/fetchWrapper";
import CircularIndeterminate from "./CircularIndeterminate";
import { StyledButton } from "./StyledButton";

function App() {
  const [token, setToken] = useState<string>("");
  const [submittedToken, setSubmittedToken] = useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedToken(false);
    setLoading(true);
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/channels");
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

  const StyledTextField = styled(TextField)({
    "& label": {
      fontSize: 16,
      "@media (max-width: 768px)": {
        fontSize: 10,
      },
    },
  });

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
        <StyledTextField
          required
          fullWidth
          name="token"
          label="Token"
          type="password"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <StyledButton type="submit" fullWidth variant="contained">
          決定
        </StyledButton>
      </Box>

      {loading && <CircularIndeterminate />}
      {submittedToken && <ChannelTable token={token} channels={channels} />}
    </Box>
  );
}

export default App;
