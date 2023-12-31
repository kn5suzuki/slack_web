import { useState } from "react";
import { Message, RawMessage } from "../types/Message";
import { Member } from "../types/Member";
import { Box, TextField } from "@mui/material";
import MessageTable from "./MessageTable";
import rawMessagesToMessages from "../utils/rawMessagesToMessages";
import fetchWrapper from "../utils/fetchWrapper";
import CircularIndeterminate from "./CircularIndeterminate";
import { StyledButton } from "./StyledButton";

export default function RemindMessage({
  token,
  channelId,
  members,
}: {
  token: string;
  channelId: string;
  members: Member[];
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sentQuery, setSentQuery] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentQuery(false);
    setLoading(true);
    const url = new URL(import.meta.env.VITE_BACKEND_URL + "/messages");
    url.searchParams.append("channel_id", channelId);
    url.searchParams.append("query", query);

    const data = await fetchWrapper<RawMessage[]>(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (data) {
      const formattedData: Message[] = rawMessagesToMessages(data, members);
      setMessages(formattedData);
      setSentQuery(true);
    }
    setLoading(false);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        component="form"
        noValidate
        onSubmit={handleSearchMessage}
      >
        <TextField
          margin="normal"
          id="query"
          label="Query"
          fullWidth
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <StyledButton type="submit" variant="contained" sx={{ width: 150 }}>
          検索
        </StyledButton>
      </Box>
      {loading && <CircularIndeterminate />}
      {sentQuery && (
        <MessageTable
          token={token}
          channelId={channelId}
          members={members}
          messages={messages}
        />
      )}
    </>
  );
}
